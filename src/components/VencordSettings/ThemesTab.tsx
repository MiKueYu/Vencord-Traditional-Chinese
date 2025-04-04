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

import { Settings, useSettings } from "@api/Settings";
import { classNameFactory } from "@api/Styles";
import { Flex } from "@components/Flex";
import { DeleteIcon, FolderIcon, PaintbrushIcon, PencilIcon, PlusIcon, RestartIcon } from "@components/Icons";
import { Link } from "@components/Link";
import { openPluginModal } from "@components/PluginSettings/PluginModal";
import type { UserThemeHeader } from "@main/themes";
import { openInviteModal } from "@utils/discord";
import { Margins } from "@utils/margins";
import { showItemInFolder } from "@utils/native";
import { useAwaiter } from "@utils/react";
import { findLazy } from "@webpack";
import { Card, Forms, React, showToast, TabBar, TextArea, useEffect, useRef, useState } from "@webpack/common";
import type { ComponentType, Ref, SyntheticEvent } from "react";
import { i18n } from "@api/i18n";

import Plugins from "~plugins";

import { AddonCard } from "./AddonCard";
import { QuickAction, QuickActionCard } from "./quickActions";
import { SettingsTab, wrapTab } from "./shared";

type FileInput = ComponentType<{
    ref: Ref<HTMLInputElement>;
    onChange: (e: SyntheticEvent<HTMLInputElement>) => void;
    multiple?: boolean;
    filters?: { name?: string; extensions: string[]; }[];
}>;

const FileInput: FileInput = findLazy(m => m.prototype?.activateUploadDialogue && m.prototype.setRef);

const cl = classNameFactory("vc-settings-theme-");

function Validator({ link }: { link: string; }) {
    const [res, err, pending] = useAwaiter(() => fetch(link).then(res => {
        if (res.status > 300) throw `${res.status} ${res.statusText}`;
        const contentType = res.headers.get("Content-Type");
        if (!contentType?.startsWith("text/css") && !contentType?.startsWith("text/plain"))
            throw i18n("SETTINGS.THEMES.NOT_CSS_FILE");

        return "Okay!";
    }));

    const text = pending
        ? i18n("SETTINGS.THEMES.CHECKING")
        : err
            ? `${i18n("SETTINGS.THEMES.ERROR")}: ${err instanceof Error ? err.message : String(err)}`
            : i18n("SETTINGS.THEMES.VALID");

    return <Forms.FormText style={{
        color: pending ? "var(--text-muted)" : err ? "var(--text-danger)" : "var(--text-positive)"
    }}>{text}</Forms.FormText>;
}

function Validators({ themeLinks }: { themeLinks: string[]; }) {
    if (!themeLinks.length) return null;

    return (
        <>
            <Forms.FormTitle className={Margins.top20} tag="h5">{i18n("SETTINGS.THEMES.VALIDATOR")}</Forms.FormTitle>
            <Forms.FormText>{i18n("SETTINGS.THEMES.VALIDATOR_NOTE")}</Forms.FormText>
            <div>
                {themeLinks.map(rawLink => {
                    const { label, link } = (() => {
                        const match = /^@(light|dark) (.*)/.exec(rawLink);
                        if (!match) return { label: rawLink, link: rawLink };

                        const [, mode, link] = match;
                        return { label: `[${mode} mode only] ${link}`, link };
                    })();

                    return <Card style={{
                        padding: ".5em",
                        marginBottom: ".5em",
                        marginTop: ".5em"
                    }} key={link}>
                        <Forms.FormTitle tag="h5" style={{
                            overflowWrap: "break-word"
                        }}>
                            {label}
                        </Forms.FormTitle>
                        <Validator link={link} />
                    </Card>;
                })}
            </div>
        </>
    );
}

interface ThemeCardProps {
    theme: UserThemeHeader;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    onDelete: () => void;
}

function ThemeCard({ theme, enabled, onChange, onDelete }: ThemeCardProps) {
    return (
        <AddonCard
            name={theme.name}
            description={theme.description}
            author={theme.author}
            enabled={enabled}
            setEnabled={onChange}
            infoButton={
                IS_WEB && (
                    <div style={{ cursor: "pointer", color: "var(--status-danger" }} onClick={onDelete}>
                        <DeleteIcon />
                    </div>
                )
            }
            footer={
                <Flex flexDirection="row" style={{ gap: "0.2em" }}>
                    {!!theme.website && <Link href={theme.website}>{i18n("SETTINGS.THEMES.WEBSITE")}</Link>}
                    {!!(theme.website && theme.invite) && " • "}
                    {!!theme.invite && (
                        <Link
                            href={`https://discord.gg/${theme.invite}`}
                            onClick={async e => {
                                e.preventDefault();
                                theme.invite != null && openInviteModal(theme.invite).catch(() => showToast(i18n("SETTINGS.THEMES.INVALID_INVITE")));
                            }}
                        >
                            {i18n("SETTINGS.THEMES.DISCORD_SERVER")}
                        </Link>
                    )}
                </Flex>
            }
        />
    );
}

enum ThemeTab {
    LOCAL,
    ONLINE
}

function ThemesTab() {
    const settings = useSettings(["themeLinks", "enabledThemes"]);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [currentTab, setCurrentTab] = useState(ThemeTab.LOCAL);
    const [themeText, setThemeText] = useState(settings.themeLinks.join("\n"));
    const [userThemes, setUserThemes] = useState<UserThemeHeader[] | null>(null);
    const [themeDir, , themeDirPending] = useAwaiter(VencordNative.themes.getThemesDir);

    useEffect(() => {
        refreshLocalThemes();
    }, []);

    async function refreshLocalThemes() {
        const themes = await VencordNative.themes.getThemesList();
        setUserThemes(themes);
    }

    // When a local theme is enabled/disabled, update the settings
    function onLocalThemeChange(fileName: string, value: boolean) {
        if (value) {
            if (settings.enabledThemes.includes(fileName)) return;
            settings.enabledThemes = [...settings.enabledThemes, fileName];
        } else {
            settings.enabledThemes = settings.enabledThemes.filter(f => f !== fileName);
        }
    }

    async function onFileUpload(e: SyntheticEvent<HTMLInputElement>) {
        e.stopPropagation();
        e.preventDefault();
        if (!e.currentTarget?.files?.length) return;
        const { files } = e.currentTarget;

        const uploads = Array.from(files, file => {
            const { name } = file;
            if (!name.endsWith(".css")) return;

            return new Promise<void>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    VencordNative.themes.uploadTheme(name, reader.result as string)
                        .then(resolve)
                        .catch(reject);
                };
                reader.readAsText(file);
            });
        });

        await Promise.all(uploads);
        refreshLocalThemes();
    }

    function renderLocalThemes() {
        return (
            <>
                <Card className="vc-settings-card">
                    <Forms.FormTitle tag="h5">{i18n("SETTINGS.THEMES.FIND_THEMES")}</Forms.FormTitle>
                    <div style={{ marginBottom: ".5em", display: "flex", flexDirection: "column" }}>
                        <Link style={{ marginRight: ".5em" }} href="https://betterdiscord.app/themes">
                            {i18n("SETTINGS.THEMES.BD_THEMES")}
                        </Link>
                        <Link href="https://github.com/search?q=discord+theme">{i18n("SETTINGS.THEMES.GITHUB")}</Link>
                    </div>
                    <Forms.FormText>{i18n("SETTINGS.THEMES.THEME_NOTE")}</Forms.FormText>
                </Card>

                <Forms.FormSection title={i18n("SETTINGS.THEMES.LOCAL_THEMES")}>
                    <QuickActionCard>
                        <>
                            {IS_WEB ?
                                (
                                    <QuickAction
                                        text={
                                            <span style={{ position: "relative" }}>
                                                {i18n("SETTINGS.THEMES.UPLOAD_THEME")}
                                                <FileInput
                                                    ref={fileInputRef}
                                                    onChange={onFileUpload}
                                                    multiple={true}
                                                    filters={[{ extensions: ["css"] }]}
                                                />
                                            </span>
                                        }
                                        Icon={PlusIcon}
                                    />
                                ) : (
                                    <QuickAction
                                        text={i18n("SETTINGS.THEMES.OPEN_FOLDER")}
                                        action={() => showItemInFolder(themeDir!)}
                                        disabled={themeDirPending}
                                        Icon={FolderIcon}
                                    />
                                )}
                            <QuickAction
                                text={i18n("SETTINGS.THEMES.LOAD_MISSING")}
                                action={refreshLocalThemes}
                                Icon={RestartIcon}
                            />
                            <QuickAction
                                text={i18n("SETTINGS.THEMES.EDIT_QUICKCSS")}
                                action={() => VencordNative.quickCss.openEditor()}
                                Icon={PaintbrushIcon}
                            />

                            {Settings.plugins.ClientTheme.enabled && (
                                <QuickAction
                                    text={i18n("SETTINGS.THEMES.EDIT_CLIENTTHEME")}
                                    action={() => openPluginModal(Plugins.ClientTheme)}
                                    Icon={PencilIcon}
                                />
                            )}
                        </>
                    </QuickActionCard>

                    <div className={cl("grid")}>
                        {userThemes?.map(theme => (
                            <ThemeCard
                                key={theme.fileName}
                                enabled={settings.enabledThemes.includes(theme.fileName)}
                                onChange={enabled => onLocalThemeChange(theme.fileName, enabled)}
                                onDelete={async () => {
                                    onLocalThemeChange(theme.fileName, false);
                                    await VencordNative.themes.deleteTheme(theme.fileName);
                                    refreshLocalThemes();
                                }}
                                theme={theme}
                            />
                        ))}
                    </div>
                </Forms.FormSection>
            </>
        );
    }

    // When the user leaves the online theme textbox, update the settings
    function onBlur() {
        settings.themeLinks = [...new Set(
            themeText
                .trim()
                .split(/\n+/)
                .map(s => s.trim())
                .filter(Boolean)
        )];
    }

    function renderOnlineThemes() {
        return (
            <>
                <Card className="vc-settings-card vc-text-selectable">
                    <Forms.FormTitle tag="h5">{i18n("SETTINGS.THEMES.PASTE_LINKS")}</Forms.FormTitle>
                    <Forms.FormText>{i18n("SETTINGS.THEMES.ONE_PER_LINE")}</Forms.FormText>
                    <Forms.FormText>{i18n("SETTINGS.THEMES.THEME_PREFIX")}</Forms.FormText>
                    <Forms.FormText>{i18n("SETTINGS.THEMES.USE_DIRECT_LINKS")}</Forms.FormText>
                </Card>

                <Forms.FormSection title={i18n("SETTINGS.THEMES.ONLINE_THEMES")} tag="h5">
                    <TextArea
                        value={themeText}
                        onChange={setThemeText}
                        className={"vc-settings-theme-links"}
                        placeholder={i18n("SETTINGS.THEMES.THEME_LINKS")}
                        spellCheck={false}
                        onBlur={onBlur}
                        rows={10}
                    />
                    <Validators themeLinks={settings.themeLinks} />
                </Forms.FormSection>
            </>
        );
    }

    return (
        <SettingsTab title={i18n("SETTINGS.THEMES.TITLE")}>
            <TabBar
                type="top"
                look="brand"
                className="vc-settings-tab-bar"
                selectedItem={currentTab}
                onItemSelect={setCurrentTab}
            >
                <TabBar.Item
                    className="vc-settings-tab-bar-item"
                    id={ThemeTab.LOCAL}
                >
                    {i18n("SETTINGS.THEMES.LOCAL_THEMES")}
                </TabBar.Item>
                <TabBar.Item
                    className="vc-settings-tab-bar-item"
                    id={ThemeTab.ONLINE}
                >
                    {i18n("SETTINGS.THEMES.ONLINE_THEMES")}
                </TabBar.Item>
            </TabBar>

            {currentTab === ThemeTab.LOCAL && renderLocalThemes()}
            {currentTab === ThemeTab.ONLINE && renderOnlineThemes()}
        </SettingsTab>
    );
}

export default wrapTab(ThemesTab, i18n("SETTINGS.THEMES.TITLE"));
