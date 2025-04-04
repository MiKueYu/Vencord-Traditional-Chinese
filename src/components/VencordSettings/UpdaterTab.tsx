/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { useSettings } from "@api/Settings";
import { ErrorCard } from "@components/ErrorCard";
import { Flex } from "@components/Flex";
import { Link } from "@components/Link";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { ModalCloseButton, ModalContent, ModalProps, ModalRoot, ModalSize, openModal } from "@utils/modal";
import { relaunch } from "@utils/native";
import { useAwaiter } from "@utils/react";
import { changes, checkForUpdates, getRepo, isNewer, update, updateError, UpdateLogger } from "@utils/updater";
import { Alerts, Button, Card, Forms, Parser, React, Switch, Toasts } from "@webpack/common";
import { i18n } from "@api/i18n";

import gitHash from "~git-hash";

import { handleSettingsTabError, SettingsTab, wrapTab } from "./shared";

function withDispatcher(dispatcher: React.Dispatch<React.SetStateAction<boolean>>, action: () => any) {
    return async () => {
        dispatcher(true);
        try {
            await action();
        } catch (e: any) {
            UpdateLogger.error("Failed to update", e);

            let err: string;
            if (!e) {
                err = "An unknown error occurred (error is undefined).\nPlease try again.";
            } else if (e.code && e.cmd) {
                const { code, path, cmd, stderr } = e;

                if (code === "ENOENT")
                    err = `Command \`${path}\` not found.\nPlease install it and try again`;
                else {
                    err = `An error occurred while running \`${cmd}\`:\n`;
                    err += stderr || `Code \`${code}\`. See the console for more info`;
                }

            } else {
                err = "An unknown error occurred. See the console for more info.";
            }

            Alerts.show({
                title: "Oops!",
                body: (
                    <ErrorCard>
                        {err.split("\n").map((line, idx) => <div key={idx}>{Parser.parse(line)}</div>)}
                    </ErrorCard>
                )
            });
        }
        finally {
            dispatcher(false);
        }
    };
}

interface CommonProps {
    repo: string;
    repoPending: boolean;
}

function HashLink({ repo, hash, disabled = false }: { repo: string, hash: string, disabled?: boolean; }) {
    return <Link href={`${repo}/commit/${hash}`} disabled={disabled}>
        {hash}
    </Link>;
}

function Changes({ updates, repo, repoPending }: CommonProps & { updates: typeof changes; }) {
    return (
        <Card style={{ padding: "0 0.5em" }}>
            {updates.map(({ hash, author, message }) => (
                <div key={hash} style={{
                    marginTop: "0.5em",
                    marginBottom: "0.5em"
                }}>
                    <code><HashLink {...{ repo, hash }} disabled={repoPending} /></code>
                    <span style={{
                        marginLeft: "0.5em",
                        color: "var(--text-normal)"
                    }}>{message} - {author}</span>
                </div>
            ))}
        </Card>
    );
}

function Updatable(props: CommonProps) {
    const [updates, setUpdates] = React.useState(changes);
    const [isChecking, setIsChecking] = React.useState(false);
    const [isUpdating, setIsUpdating] = React.useState(false);

    const isOutdated = (updates?.length ?? 0) > 0;

    return (
        <>
            {!updates && updateError ? (
                <>
                    <Forms.FormText>{i18n("SETTINGS.UPDATER.FAILED_CHECK")}</Forms.FormText>
                    <ErrorCard style={{ padding: "1em" }}>
                        <p>{updateError.stderr || updateError.stdout || i18n("SETTINGS.UPDATER.UNKNOWN_ERROR")}</p>
                    </ErrorCard>
                </>
            ) : (
                <Forms.FormText className={Margins.bottom8}>
                    {isOutdated ? (updates.length === 1 ? i18n("SETTINGS.UPDATER.UPDATE_AVAILABLE") : i18n("SETTINGS.UPDATER.UPDATES_AVAILABLE", { count: updates.length })) : i18n("SETTINGS.UPDATER.UP_TO_DATE")}
                </Forms.FormText>
            )}

            {isOutdated && <Changes updates={updates} {...props} />}

            <Flex className={classes(Margins.bottom8, Margins.top8)}>
                {isOutdated && <Button
                    size={Button.Sizes.SMALL}
                    disabled={isUpdating || isChecking}
                    onClick={withDispatcher(setIsUpdating, async () => {
                        if (await update()) {
                            setUpdates([]);
                            await new Promise<void>(r => {
                                Alerts.show({
                                    title: i18n("SETTINGS.UPDATER.UPDATE_SUCCESS"),
                                    body: i18n("SETTINGS.UPDATER.RESTART_PROMPT"),
                                    confirmText: i18n("SETTINGS.UPDATER.RESTART"),
                                    cancelText: i18n("SETTINGS.UPDATER.LATER"),
                                    onConfirm() {
                                        relaunch();
                                        r();
                                    },
                                    onCancel: r
                                });
                            });
                        }
                    })}
                >
                    {i18n("SETTINGS.UPDATER.UPDATE_NOW")}
                </Button>}
                <Button
                    size={Button.Sizes.SMALL}
                    disabled={isUpdating || isChecking}
                    onClick={withDispatcher(setIsChecking, async () => {
                        const outdated = await checkForUpdates();
                        if (outdated) {
                            setUpdates(changes);
                        } else {
                            setUpdates([]);
                            Toasts.show({
                                message: i18n("SETTINGS.UPDATER.NO_UPDATES"),
                                id: Toasts.genId(),
                                type: Toasts.Type.MESSAGE,
                                options: {
                                    position: Toasts.Position.BOTTOM
                                }
                            });
                        }
                    })}
                >
                    {i18n("SETTINGS.UPDATER.CHECK_UPDATES")}
                </Button>
            </Flex>
        </>
    );
}

function Newer(props: CommonProps) {
    return (
        <>
            <Forms.FormText className={Margins.bottom8}>
                {i18n("SETTINGS.UPDATER.NEWER_LOCAL")}
            </Forms.FormText>
            <Changes {...props} updates={changes} />
        </>
    );
}

function Updater() {
    const settings = useSettings(["autoUpdate", "autoUpdateNotification"]);

    const [repo, err, repoPending] = useAwaiter(getRepo, { fallbackValue: i18n("SETTINGS.UPDATER.LOADING") });

    React.useEffect(() => {
        if (err)
            UpdateLogger.error("Failed to retrieve repo", err);
    }, [err]);

    const commonProps: CommonProps = {
        repo,
        repoPending
    };

    return (
        <SettingsTab title={i18n("SETTINGS.UPDATER.TITLE")}>
            <Forms.FormTitle tag="h5">{i18n("SETTINGS.UPDATER.UPDATER_SETTINGS")}</Forms.FormTitle>
            <Switch
                value={settings.autoUpdate}
                onChange={(v: boolean) => settings.autoUpdate = v}
                note={i18n("SETTINGS.UPDATER.AUTO_UPDATE_NOTE")}
            >
                {i18n("SETTINGS.UPDATER.AUTO_UPDATE")}
            </Switch>
            <Switch
                value={settings.autoUpdateNotification}
                onChange={(v: boolean) => settings.autoUpdateNotification = v}
                note={i18n("SETTINGS.UPDATER.AUTO_UPDATE_NOTIFICATION_NOTE")}
                disabled={!settings.autoUpdate}
            >
                {i18n("SETTINGS.UPDATER.AUTO_UPDATE_NOTIFICATION")}
            </Switch>

            <Forms.FormTitle tag="h5">{i18n("SETTINGS.UPDATER.REPO")}</Forms.FormTitle>

            <Forms.FormText className="vc-text-selectable">
                {repoPending
                    ? repo
                    : err
                        ? i18n("SETTINGS.UPDATER.FAILED_RETRIEVE")
                        : (
                            <Link href={repo}>
                                {repo.split("/").slice(-2).join("/")}
                            </Link>
                        )
                }
                {" "}(<HashLink hash={gitHash} repo={repo} disabled={repoPending} />)
            </Forms.FormText>

            <Forms.FormDivider className={Margins.top8 + " " + Margins.bottom8} />

            <Forms.FormTitle tag="h5">{i18n("SETTINGS.UPDATER.UPDATES")}</Forms.FormTitle>

            {isNewer ? <Newer {...commonProps} /> : <Updatable {...commonProps} />}
        </SettingsTab>
    );
}

export default IS_UPDATER_DISABLED ? null : wrapTab(Updater, i18n("SETTINGS.UPDATER.TITLE"));

export const openUpdaterModal = IS_UPDATER_DISABLED ? null : function () {
    const UpdaterTab = wrapTab(Updater, i18n("SETTINGS.UPDATER.TITLE"));

    try {
        openModal(wrapTab((modalProps: ModalProps) => (
            <ModalRoot {...modalProps} size={ModalSize.MEDIUM}>
                <ModalContent className="vc-updater-modal">
                    <ModalCloseButton onClick={modalProps.onClose} className="vc-updater-modal-close-button" />
                    <UpdaterTab />
                </ModalContent>
            </ModalRoot>
        ), "UpdaterModal"));
    } catch {
        handleSettingsTabError();
    }
};
