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

import { i18n } from "@api/i18n";
import { openNotificationLogModal } from "@api/Notifications/notificationLog";
import { useSettings } from "@api/Settings";
import { classNameFactory } from "@api/Styles";
import DonateButton from "@components/DonateButton";
import { openContributorModal } from "@components/PluginSettings/ContributorModal";
import { openPluginModal } from "@components/PluginSettings/PluginModal";
import { gitRemote } from "@shared/vencordUserAgent";
import { DONOR_ROLE_ID, VENCORD_GUILD_ID } from "@utils/constants";
import { Margins } from "@utils/margins";
import { identity, isPluginDev } from "@utils/misc";
import { relaunch, showItemInFolder } from "@utils/native";
import { useAwaiter } from "@utils/react";
import { Button, Forms, GuildMemberStore, React, Select, Switch, UserStore } from "@webpack/common";

import BadgeAPI from "../../plugins/_api/badges";
import { Flex, FolderIcon, GithubIcon, LogIcon, PaintbrushIcon, RestartIcon } from "..";
import { openNotificationSettingsModal } from "./NotificationSettings";
import { QuickAction, QuickActionCard } from "./quickActions";
import { SettingsTab, wrapTab } from "./shared";
import { SpecialCard } from "./SpecialCard";

const cl = classNameFactory("vc-settings-");

const DEFAULT_DONATE_IMAGE = "https://cdn.discordapp.com/emojis/1026533090627174460.png";
const SHIGGY_DONATE_IMAGE = "https://media.discordapp.net/stickers/1039992459209490513.png";

const VENNIE_DONATOR_IMAGE = "https://cdn.discordapp.com/emojis/1238120638020063377.png";
const COZY_CONTRIB_IMAGE = "https://cdn.discordapp.com/emojis/1026533070955872337.png";

const DONOR_BACKGROUND_IMAGE = "https://media.discordapp.net/stickers/1311070116305436712.png?size=2048";
const CONTRIB_BACKGROUND_IMAGE = "https://media.discordapp.net/stickers/1311070166481895484.png?size=2048";

type KeysOfType<Object, Type> = {
    [K in keyof Object]: Object[K] extends Type ? K : never;
}[keyof Object];

function VencordSettings() {
    const [settingsDir, , settingsDirPending] = useAwaiter(VencordNative.settings.getSettingsDir, {
        fallbackValue: "Loading..."
    });
    const settings = useSettings();

    const donateImage = React.useMemo(() => Math.random() > 0.5 ? DEFAULT_DONATE_IMAGE : SHIGGY_DONATE_IMAGE, []);

    const isWindows = navigator.platform.toLowerCase().startsWith("win");
    const isMac = navigator.platform.toLowerCase().startsWith("mac");
    const needsVibrancySettings = IS_DISCORD_DESKTOP && isMac;

    const user = UserStore.getCurrentUser();

    const Switches: Array<false | {
        key: KeysOfType<typeof settings, boolean>;
        title: string;
        note: string;
    }> =
        [
            {
                key: "useQuickCss",
                title: i18n("SETTINGS.MAIN_SETTINGS.ENABLE_CUSTOM_CSS"),
                note: i18n("SETTINGS.MAIN_SETTINGS.ENABLE_CUSTOM_CSS_NOTE")
            },
            !IS_WEB && {
                key: "enableReactDevtools",
                title: i18n("SETTINGS.MAIN_SETTINGS.ENABLE_REACT_DEVTOOLS"),
                note: i18n("SETTINGS.MAIN_SETTINGS.ENABLE_REACT_DEVTOOLS_NOTE")
            },
            !IS_WEB && (!IS_DISCORD_DESKTOP || !isWindows ? {
                key: "frameless",
                title: i18n("SETTINGS.MAIN_SETTINGS.WINDOW_FRAME.DISABLE_FRAME"),
                note: i18n("SETTINGS.MAIN_SETTINGS.WINDOW_FRAME_NOTE")
            } : {
                key: "winNativeTitleBar",
                title: i18n("SETTINGS.MAIN_SETTINGS.WINDOW_FRAME.NATIVE_TITLEBAR"),
                note: i18n("SETTINGS.MAIN_SETTINGS.WINDOW_FRAME_NOTE")
            }),
            !IS_WEB && {
                key: "transparent",
                title: i18n("SETTINGS.MAIN_SETTINGS.TRANSPARENT_WINDOW"),
                note: i18n("SETTINGS.MAIN_SETTINGS.TRANSPARENT_WINDOW_NOTE")
            },
            !IS_WEB && isWindows && {
                key: "winCtrlQ",
                title: i18n("SETTINGS.MAIN_SETTINGS.CTRL_Q"),
                note: i18n("SETTINGS.MAIN_SETTINGS.CTRL_Q_NOTE")
            },
            IS_DISCORD_DESKTOP && {
                key: "disableMinSize",
                title: i18n("SETTINGS.MAIN_SETTINGS.DISABLE_MIN_SIZE"),
                note: i18n("SETTINGS.MAIN_SETTINGS.DISABLE_MIN_SIZE_NOTE")
            },
        ];

    return (
        <SettingsTab title={i18n("SETTINGS.VENCORD_SETTINGS")}>
            {isDonor(user?.id)
                ? (
                    <SpecialCard
                        title={i18n("SETTINGS.DONATIONS.TITLE")}
                        subtitle={i18n("SETTINGS.DONATIONS.SUBTITLE")}
                        description={i18n("SETTINGS.DONATIONS.DESCRIPTION")}
                        cardImage={VENNIE_DONATOR_IMAGE}
                        backgroundImage={DONOR_BACKGROUND_IMAGE}
                        backgroundColor="#ED87A9"
                    >
                        <DonateButtonComponent />
                    </SpecialCard>
                )
                : (
                    <SpecialCard
                        title={i18n("SETTINGS.DONATIONS.SUPPORT_PROJECT")}
                        description={i18n("SETTINGS.DONATIONS.SUPPORT_DESCRIPTION")}
                        cardImage={donateImage}
                        backgroundImage={DONOR_BACKGROUND_IMAGE}
                        backgroundColor="#c3a3ce"
                    >
                        <DonateButtonComponent />
                    </SpecialCard>
                )
            }
            {isPluginDev(user?.id) && (
                <SpecialCard
                    title={i18n("SETTINGS.CONTRIBUTIONS.TITLE")}
                    subtitle={i18n("SETTINGS.CONTRIBUTIONS.SUBTITLE")}
                    description={i18n("SETTINGS.CONTRIBUTIONS.DESCRIPTION")}
                    cardImage={COZY_CONTRIB_IMAGE}
                    backgroundImage={CONTRIB_BACKGROUND_IMAGE}
                    backgroundColor="#EDCC87"
                    buttonTitle={i18n("SETTINGS.CONTRIBUTIONS.BUTTON")}
                    buttonOnClick={() => openContributorModal(user)}
                />
            )}

            <Forms.FormSection title={i18n("SETTINGS.QUICK_ACTIONS.TITLE")}>
                <QuickActionCard>
                    <QuickAction
                        Icon={LogIcon}
                        text={i18n("SETTINGS.QUICK_ACTIONS.NOTIFICATION_LOG")}
                        action={openNotificationLogModal}
                    />
                    <QuickAction
                        Icon={PaintbrushIcon}
                        text={i18n("SETTINGS.QUICK_ACTIONS.EDIT_QUICKCSS")}
                        action={() => VencordNative.quickCss.openEditor()}
                    />
                    {!IS_WEB && (
                        <QuickAction
                            Icon={RestartIcon}
                            text={i18n("SETTINGS.QUICK_ACTIONS.RELAUNCH_DISCORD")}
                            action={relaunch}
                        />
                    )}
                    {!IS_WEB && (
                        <QuickAction
                            Icon={FolderIcon}
                            text={i18n("SETTINGS.QUICK_ACTIONS.OPEN_SETTINGS_FOLDER")}
                            action={() => showItemInFolder(settingsDir)}
                        />
                    )}
                    <QuickAction
                        Icon={GithubIcon}
                        text={i18n("SETTINGS.QUICK_ACTIONS.VIEW_SOURCE_CODE")}
                        action={() => VencordNative.native.openExternal("https://github.com/" + gitRemote)}
                    />
                </QuickActionCard>
            </Forms.FormSection>

            <Forms.FormDivider />

            <Forms.FormSection className={Margins.top16} title={i18n("SETTINGS.MAIN_SETTINGS.TITLE")} tag="h5">
                <Forms.FormText className={Margins.bottom20} style={{ color: "var(--text-muted)" }}>
                    {i18n("SETTINGS.MAIN_SETTINGS.HINT")}
                    {" "}<Button
                        look={Button.Looks.BLANK}
                        style={{ color: "var(--text-link)", display: "inline-block" }}
                        onClick={() => openPluginModal(Vencord.Plugins.plugins.Settings)}
                    >
                        settings of the Settings plugin
                    </Button>!
                </Forms.FormText>

                {/* Language Selector */}
                <Forms.FormTitle tag="h5">{i18n("SETTINGS.LANGUAGE")}</Forms.FormTitle>
                <Forms.FormText className={Margins.bottom8}>
                    {i18n("SETTINGS.LANGUAGE_DESCRIPTION")}
                </Forms.FormText>
                <Select
                    options={[
                        { label: "English", value: "en-US" },
                        { label: "繁體中文", value: "zh-TW" },
                        { label: "简体中文", value: "zh-CN" }
                    ]}
                    closeOnSelect={true}
                    select={v => { settings.language = v; }}
                    isSelected={v => v === settings.language}
                    serialize={identity}
                />

                {Switches.map(s => s && (
                    <Switch
                        key={s.key}
                        value={settings[s.key]}
                        onChange={v => settings[s.key] = v}
                        note={s.note}
                    >
                        {s.title}
                    </Switch>
                ))}
            </Forms.FormSection>


            {needsVibrancySettings && <>
                <Forms.FormTitle tag="h5">Window vibrancy style (requires restart)</Forms.FormTitle>
                <Select
                    className={Margins.bottom20}
                    placeholder="Window vibrancy style"
                    options={[
                        // Sorted from most opaque to most transparent
                        {
                            label: "No vibrancy", value: undefined
                        },
                        {
                            label: "Under Page (window tinting)",
                            value: "under-page"
                        },
                        {
                            label: "Content",
                            value: "content"
                        },
                        {
                            label: "Window",
                            value: "window"
                        },
                        {
                            label: "Selection",
                            value: "selection"
                        },
                        {
                            label: "Titlebar",
                            value: "titlebar"
                        },
                        {
                            label: "Header",
                            value: "header"
                        },
                        {
                            label: "Sidebar",
                            value: "sidebar"
                        },
                        {
                            label: "Tooltip",
                            value: "tooltip"
                        },
                        {
                            label: "Menu",
                            value: "menu"
                        },
                        {
                            label: "Popover",
                            value: "popover"
                        },
                        {
                            label: "Fullscreen UI (transparent but slightly muted)",
                            value: "fullscreen-ui"
                        },
                        {
                            label: "HUD (Most transparent)",
                            value: "hud"
                        },
                    ]}
                    select={v => settings.macosVibrancyStyle = v}
                    isSelected={v => settings.macosVibrancyStyle === v}
                    serialize={identity} />
            </>}

            <Forms.FormSection className={Margins.top16} title={i18n("SETTINGS.NOTIFICATION.TITLE")} tag="h5">
                <Flex>
                    <Button onClick={openNotificationSettingsModal}>
                        {i18n("SETTINGS.NOTIFICATION.TITLE")}
                    </Button>
                    <Button onClick={openNotificationLogModal}>
                        {i18n("SETTINGS.NOTIFICATION.VIEW_LOG")}
                    </Button>
                </Flex>
            </Forms.FormSection>
        </SettingsTab>
    );
}

function DonateButtonComponent() {
    return (
        <div style={{ marginTop: "1em" }}>
            <DonateButton
                look={Button.Looks.FILLED}
                color={Button.Colors.WHITE}
            />
        </div>
    );
}

function isDonor(userId: string): boolean {
    const donorBadges = BadgeAPI.getDonorBadges(userId);
    return GuildMemberStore.getMember(VENCORD_GUILD_ID, userId)?.roles.includes(DONOR_ROLE_ID) || !!donorBadges;
}

export default wrapTab(VencordSettings, "Vencord Settings");
