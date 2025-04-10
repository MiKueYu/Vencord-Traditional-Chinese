/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { Settings } from "./Settings";

export type Language = "en-US" | "zh-TW" | "zh-CN";

export interface TranslationObject {
    [key: string]: string | TranslationObject;
}

// 英文（默認）
const enUS: TranslationObject = {
    SETTINGS: {
        SIDEBAR_HEADER: "Vencord",
        SIDEBAR: "Vencord",
        VENCORD_SETTINGS: "Vencord Settings",
        LANGUAGE: "Language",
        LANGUAGE_DESCRIPTION: "Select the language for Vencord's interface",
        LANGUAGES: {
            "en-US": "English",
            "zh-TW": "繁體中文",
            "zh-CN": "简体中文"
        },
        TAB_ERROR: "Failed to render the {tab} tab. If this issue persists, try using the installer to reinstall!",
        DONATIONS: {
            TITLE: "Donations",
            SUBTITLE: "Thank you for donating!",
            DESCRIPTION: "You can manage your perks at any time by messaging @vending.machine.",
            SUPPORT_PROJECT: "Support the Project",
            SUPPORT_DESCRIPTION: "Please consider supporting the development of Vencord by donating!"
        },
        CONTRIBUTIONS: {
            TITLE: "Contributions",
            SUBTITLE: "Thank you for contributing!",
            DESCRIPTION: "Since you've contributed to Vencord you now have a cool new badge!",
            BUTTON: "See what you've contributed to"
        },
        QUICK_ACTIONS: {
            TITLE: "Quick Actions",
            NOTIFICATION_LOG: "Notification Log",
            EDIT_QUICKCSS: "Edit QuickCSS",
            RELAUNCH_DISCORD: "Relaunch Discord",
            OPEN_SETTINGS_FOLDER: "Open Settings Folder",
            VIEW_SOURCE_CODE: "View Source Code"
        },
        MAIN_SETTINGS: {
            TITLE: "Settings",
            HINT: "Hint: You can change the position of this settings section in the settings of the Settings plugin",
            ENABLE_CUSTOM_CSS: "Enable Custom CSS",
            ENABLE_CUSTOM_CSS_NOTE: "Loads your Custom CSS",
            ENABLE_REACT_DEVTOOLS: "Enable React Developer Tools",
            ENABLE_REACT_DEVTOOLS_NOTE: "Requires a full restart",
            WINDOW_FRAME: {
                DISABLE_FRAME: "Disable the window frame",
                NATIVE_TITLEBAR: "Use Windows' native title bar instead of Discord's custom one"
            },
            WINDOW_FRAME_NOTE: "Requires a full restart",
            TRANSPARENT_WINDOW: "Enable window transparency.",
            TRANSPARENT_WINDOW_NOTE: "You need a theme that supports transparency or this will do nothing. WILL STOP THE WINDOW FROM BEING RESIZABLE!! Requires a full restart",
            CTRL_Q: "Register Ctrl+Q as shortcut to close Discord (Alternative to Alt+F4)",
            CTRL_Q_NOTE: "Requires a full restart",
            DISABLE_MIN_SIZE: "Disable minimum window size",
            DISABLE_MIN_SIZE_NOTE: "Requires a full restart"
        },
        BACKUP_RESTORE: {
            SIDEBAR: "Backup & Restore",
            TITLE: "Backup & Restore",
            WARNING: "Warning",
            WARNING_MESSAGE: "Importing a settings file will overwrite your current settings.",
            DESCRIPTION: "You can import and export your Vencord settings as a JSON file. This allows you to easily transfer your settings to another device, or recover your settings after reinstalling Vencord or Discord.",
            EXPORT_CONTAINS: "Settings Export contains:",
            CUSTOM_QUICKCSS: "Custom QuickCSS",
            THEME_LINKS: "Theme Links",
            PLUGIN_SETTINGS: "Plugin Settings",
            IMPORT_BUTTON: "Import Settings",
            EXPORT_BUTTON: "Export Settings"
        },
        CLOUD: {
            SIDEBAR: "Cloud",
            TITLE: "Vencord Cloud",
            SETTINGS_TITLE: "Cloud Settings",
            DESCRIPTION: "Vencord comes with a cloud integration that adds goodies like settings sync across devices. It respects your privacy, and the source code is AGPL 3.0 licensed so you can host it yourself.",
            ENABLE_INTEGRATION: "Enable Cloud Integrations",
            INTEGRATION_NOTE: "This will request authorization if you have not yet set up cloud integrations.",
            BACKEND_URL: "Backend URL",
            BACKEND_URL_DESCRIPTION: "Which backend to use when using cloud integrations.",
            REAUTHORIZE: "Reauthorise",
            ERASE_DATA: "Erase All Data",
            ERASE_CONFIRM: "Are you sure?",
            ERASE_CONFIRM_MESSAGE: "Once your data is erased, we cannot recover it. There's no going back!",
            ERASE_BUTTON: "Erase it!",
            ERASE_CANCEL: "Nevermind",
            ERASE_FAILED: "Failed to clear all data (API returned {status}), please contact support.",
            ERASE_SUCCESS: "Successfully cleared all data.",
            SYNC_TITLE: "Settings Sync",
            SYNC_DESCRIPTION: "Synchronize your settings to the cloud. This allows easy synchronization across multiple devices with minimal effort.",
            SYNC_ENABLE: "Settings Sync",
            SYNC_TO_CLOUD: "Sync to Cloud",
            SYNC_FROM_CLOUD: "Sync from Cloud",
            SYNC_FROM_CLOUD_TIP: "This will overwrite your local settings with the ones on the cloud. Use wisely!",
            DELETE_CLOUD: "Delete Cloud Settings",
            INVALID_URL: "Invalid URL"
        },
        NOTIFICATION: {
            TITLE: "Notification Settings",
            STYLE: "Notification Style",
            PERMISSION_DENIED: "Desktop Notification Permission denied",
            PERMISSION_DENIED_MESSAGE: "You have denied Notification Permissions. Thus, Desktop notifications will not work!",
            STYLE_DESCRIPTION: "Some plugins may show you notifications. These come in two styles:",
            VENCORD_NOTIFICATIONS: "Vencord Notifications: These are in-app notifications",
            DESKTOP_NOTIFICATIONS: "Desktop Notifications: Native Desktop notifications (like when you get a ping)",
            STYLE_OPTIONS: {
                NOT_FOCUSED: "Only use Desktop notifications when Discord is not focused",
                ALWAYS: "Always use Desktop notifications",
                NEVER: "Always use Vencord notifications"
            },
            POSITION: "Notification Position",
            POSITION_OPTIONS: {
                BOTTOM_RIGHT: "Bottom Right",
                TOP_RIGHT: "Top Right"
            },
            TIMEOUT: "Notification Timeout",
            TIMEOUT_NOTE: "Set to 0s to never automatically time out",
            LOG_LIMIT: "Notification Log Limit",
            LOG_LIMIT_DESCRIPTION: "The amount of notifications to save in the log until old ones are removed. Set to 0 to disable Notification log and ∞ to never automatically remove old Notifications",
            VIEW_LOG: "View Notification Log"
        },
        THEMES: {
            SIDEBAR: "Themes",
            TITLE: "Themes",
            LOCAL_THEMES: "Local Themes",
            ONLINE_THEMES: "Online Themes",
            FIND_THEMES: "Find Themes:",
            BD_THEMES: "BetterDiscord Themes",
            GITHUB: "GitHub",
            THEME_NOTE: "If using the BD site, click on \"Download\" and place the downloaded .theme.css file into your themes folder.",
            UPLOAD_THEME: "Upload Theme",
            OPEN_FOLDER: "Open Themes Folder",
            LOAD_MISSING: "Load missing Themes",
            EDIT_QUICKCSS: "Edit QuickCSS",
            EDIT_CLIENTTHEME: "Edit ClientTheme",
            PASTE_LINKS: "Paste links to css files here",
            ONE_PER_LINE: "One link per line",
            THEME_PREFIX: "You can prefix lines with @light or @dark to toggle them based on your Discord theme",
            USE_DIRECT_LINKS: "Make sure to use direct links to files (raw or github.io)!",
            VALIDATOR: "Validator",
            VALIDATOR_NOTE: "This section will tell you whether your themes can successfully be loaded",
            NOT_CSS_FILE: "Not a CSS file. Remember to use the raw link!",
            CHECKING: "Checking...",
            ERROR: "Error",
            VALID: "Valid!",
            WEBSITE: "Website",
            DISCORD_SERVER: "Discord Server",
            INVALID_INVITE: "Invalid or expired invite",
            THEME_LINKS: "Theme Links"
        },
        UPDATER: {
            SIDEBAR: "Updater",
            TITLE: "Updater",
            UPDATER_SETTINGS: "Updater Settings",
            AUTO_UPDATE: "Automatically update",
            AUTO_UPDATE_NOTE: "Automatically update Vencord without confirmation prompt",
            AUTO_UPDATE_NOTIFICATION: "Get notified when an automatic update completes",
            AUTO_UPDATE_NOTIFICATION_NOTE: "Shows a notification when Vencord automatically updates",
            REPO: "Repo",
            UPDATES: "Updates",
            UP_TO_DATE: "Up to Date!",
            UPDATE_AVAILABLE: "There is 1 Update",
            UPDATES_AVAILABLE: "There are {count} Updates",
            UPDATE_NOW: "Update Now",
            CHECK_UPDATES: "Check for Updates",
            NO_UPDATES: "No updates found!",
            NEWER_LOCAL: "Your local copy has more recent commits. Please stash or reset them.",
            FAILED_CHECK: "Failed to check updates. Check the console for more info",
            UNKNOWN_ERROR: "An unknown error occurred",
            UPDATE_SUCCESS: "Update Success!",
            RESTART_PROMPT: "Successfully updated. Restart now to apply the changes?",
            RESTART: "Restart",
            LATER: "Not now!",
            FAILED_RETRIEVE: "Failed to retrieve - check console",
            LOADING: "Loading..."
        },
        PLUGINS: {
            SIDEBAR: "Plugins",
            TITLE: "Plugins",
            SEARCH: "Search for plugins...",
            DISCORD: "Discord Plugins",
            USERPLUGINS: "User Plugins",
            FOLDER: "Plugins Folder",
            PLUGIN_SETTINGS: "Plugin Settings",
            PLUGIN_SETTINGS_DESCRIPTION: "Configure installed plugins",
            USERPLUGINS_DIRECTORY: "User Plugins Directory",
            USERPLUGINS_DESCRIPTION: "You can place custom plugins here",
            USERPLUGINS_OPEN: "Open User Plugins Directory",
            USERPLUGINS_CREATE: "Create a Sample Plugin",
            API_DOCS: "API Docs",
            API_DOCS_DESCRIPTION: "Learn how to develop Vencord plugins",
            ENABLE_ALL: "Enable All",
            DISABLE_ALL: "Disable All",
            PLUGIN_TOGGLED: "{count, plural, one {Plugin # toggled} other {Plugins # toggled}}",
            NO_PLUGINS_FOUND: "No plugins found",
            PLUGIN_MANAGEMENT: "Plugin Management",
            PLUGIN_MANAGEMENT_NOTE: "Enable or disable plugins by clicking the switch on the right side of the card.",
            PLUGIN_MANAGEMENT_COG_NOTE: "Click on the cog or info icon to configure or learn more about a plugin.",
            FILTERS: "Filters",
            SHOW_ALL: "Show All",
            SHOW_ENABLED: "Show Enabled",
            SHOW_DISABLED: "Show Disabled",
            SHOW_NEW: "Show New",
            AUTHORS: "Authors",
            VIEW_MORE_INFO: "View more info",
            VIEW_SOURCE_CODE: "View source code",
            NO_SETTINGS: "There are no settings for this plugin.",
            SAVE_CHANGES: "Save & Close",
            RESTART_REQUIRED: "Restart required!",
            RESTART_REQUIRED_NOTE: "The following plugins require a restart:",
            RESTART_NOW: "Restart now",
            LATER: "Later!",
            REQUIRED_PLUGINS: "Required Plugins",
            LOOKING_FOR: "Are you looking for:",
            ONLY_AVAILABLE_ON: "Only available on the",
            NO_SEARCH_RESULTS: "No plugins meet the search criteria.",
            REQUIRED_BY: "This plugin is required by:",
            REQUIRED_FOR_FUNCTIONING: "This plugin is required for Vencord to function."
        }
    },

    // 添加插件描述的翻譯
    PLUGINS: {
        AccountPanelServerProfile: {
            name: "Account Panel Server Profile",
            description: "Right click your account panel in the bottom left to view your profile in the current server"
        },
        AlwaysAnimate: {
            name: "Always Animate",
            description: "Animates anything that can be animated"
        },
        AlwaysExpandRoles: {
            name: "Always Expand Roles",
            description: "Always expands the role list in profile popouts"
        },
        AlwaysTrust: {
            name: "Always Trust",
            description: "Removes the annoying untrusted domain and suspicious file popup"
        },
        AnonymiseFileNames: {
            name: "Anonymise File Names",
            description: "Anonymise uploaded file names"
        },
        BANger: {
            name: "BANger",
            description: "Replaces the GIF in the ban dialogue with a custom one."
        },
        BetterFolders: {
            name: "Better Folders",
            description: "Shows server folders on dedicated sidebar and adds folder related improvements"
        },
        BetterGifAltText: {
            name: "Better Gif Alt Text",
            description: "Change GIF alt text from simply being 'GIF' to containing the gif tags / filename"
        },
        BetterGifPicker: {
            name: "Better Gif Picker",
            description: "Makes the gif picker open the favourite category by default"
        },
        BetterNotesBox: {
            name: "Better Notes Box",
            description: "Hide notes or disable spellcheck (Configure in settings!!)"
        },
        BetterRoleContext: {
            name: "Better Role Context",
            description: "Adds options to copy role color / edit role / view as role"
        },
        BetterRoleDot: {
            name: "Better Role Dot",
            description: "Copy role colour on RoleDot (accessibility setting)"
        },
        BetterSessions: {
            name: "Better Sessions",
            description: "Enhances the sessions (devices) menu. Allows you to view exact timestamps, give each session custom names and enables one-click-copying of your token."
        },
        BetterSettings: {
            name: "Better Settings",
            description: "Enhances your settings-menu-opening experience"
        },
        BetterUploadButton: {
            name: "Better Upload Button",
            description: "Upload with a single click, open menu with right click"
        },
        BiggerStreamPreview: {
            name: "Bigger Stream Preview",
            description: "This plugin allows you to enlarge stream previews"
        },
        BlurNSFW: {
            name: "Blur NSFW",
            description: "Blur attachments in NSFW channels until hovered"
        },
        CallTimer: {
            name: "Call Timer",
            description: "Adds a timer to vcs"
        },
        ClearURLs: {
            name: "Clear URLs",
            description: "Removes tracking garbage from URLs"
        },
        ClientTheme: {
            name: "Client Theme",
            description: "Recreation of the old client theme experiment. Add a color to your Discord client theme"
        },
        ColorSighted: {
            name: "Color Sighted",
            description: "Removes the colorblind-friendly icons from statuses, just like 2015-2017 Discord"
        },
        ConsoleJanitor: {
            name: "Console Janitor",
            description: "Disables annoying console messages/errors"
        },
        ConsoleShortcuts: {
            name: "Console Shortcuts",
            description: "Adds shorter Aliases for many things on the console"
        },
        CopyEmojisMarkdown: {
            name: "Copy Emojis Markdown",
            description: "Allows you to copy emojis as formatted string"
        },
        CustomCSS: {
            name: "Custom CSS",
            description: "Lets you install custom CSS."
        },
        DisableDMCallIdle: {
            name: "Disable DM Call Idle",
            description: "Prevents Discord from detecting when you're AFK in DM calls"
        },
        FakeDeafen: {
            name: "Fake Deafen",
            description: "Allows you to hear others while appearing as deafened"
        },
        FakeNitro: {
            name: "Fake Nitro",
            description: "Use nitro-locked features with plugins"
        },
        FavoriteGifs: {
            name: "Favorite Gifs",
            description: "Allows you to save gifs as 'favorites'"
        },
        FixYoutubeLinks: {
            name: "Fix Youtube Links",
            description: "Opens youtube.com links instead of youtube-nocookie.com"
        },
        ForceOwnerCrown: {
            name: "Force Owner Crown",
            description: "Always shows the owner crown even if the server uses roles for this"
        },
        ImageZoom: {
            name: "Image Zoom",
            description: "Lets you zoom into images"
        },
        InvisibleChat: {
            name: "Invisible Chat",
            description: "Allows you to send messages that are invisible until hovered (spoilers alternative)"
        },
        MessageLinkEmbeds: {
            name: "Message Link Embeds",
            description: "Shows embeds for messages you link"
        },
        MessageLogger: {
            name: "Message Logger",
            description: "Logs deleted and edited messages."
        },
        MessageTags: {
            name: "Message Tags",
            description: "Add tags to messages to find them easily"
        },
        MoreCommands: {
            name: "More Commands",
            description: "Adds useful commands to Discord"
        },
        MoreUserTags: {
            name: "More User Tags",
            description: "Adds more user tags to Discord!"
        },
        MuteNewGuild: {
            name: "Mute New Guild",
            description: "Automatically mutes newly joined guilds"
        },
        NoF1: {
            name: "No F1",
            description: "Disables F1 help shortcut"
        },
        NoReplyMention: {
            name: "No Reply Mention",
            description: "Makes Discord default to not mentioning when replying"
        },
        PermissionsViewer: {
            name: "Permissions Viewer",
            description: "View a user's or your own permissions in a channel."
        },
        PictureInPicture: {
            name: "Picture In Picture",
            description: "Adds support for Picture in Picture for streams and videos"
        },
        PlatformIndicators: {
            name: "Platform Indicators",
            description: "Display the platform other users are using."
        },
        Settings: {
            name: "Settings",
            description: "Adds a button to open Vencord Settings."
        }
    }
};

// 繁體中文
const zhTW: TranslationObject = {
    SETTINGS: {
        SIDEBAR_HEADER: "Vencord",
        SIDEBAR: "Vencord",
        VENCORD_SETTINGS: "Vencord 設定",
        LANGUAGE: "語言",
        LANGUAGE_DESCRIPTION: "選擇 Vencord 界面的語言",
        LANGUAGES: {
            "en-US": "English",
            "zh-TW": "繁體中文",
            "zh-CN": "简体中文"
        },
        TAB_ERROR: "無法渲染{tab}標籤。如果此問題持續存在，請嘗試使用安裝程式重新安裝！",
        DONATIONS: {
            TITLE: "捐贈",
            SUBTITLE: "感謝您的捐贈！",
            DESCRIPTION: "您可以隨時通過消息 @vending.machine 來管理您的特權。",
            SUPPORT_PROJECT: "支持此項目",
            SUPPORT_DESCRIPTION: "請考慮通過捐贈來支持 Vencord 的開發！"
        },
        CONTRIBUTIONS: {
            TITLE: "貢獻",
            SUBTITLE: "感謝您的貢獻！",
            DESCRIPTION: "由於您對 Vencord 做出了貢獻，您現在擁有一個很酷的新徽章！",
            BUTTON: "查看您的貢獻"
        },
        QUICK_ACTIONS: {
            TITLE: "快速操作",
            NOTIFICATION_LOG: "通知日誌",
            EDIT_QUICKCSS: "編輯 QuickCSS",
            RELAUNCH_DISCORD: "重新啟動 Discord",
            OPEN_SETTINGS_FOLDER: "打開設定文件夾",
            VIEW_SOURCE_CODE: "查看原始碼"
        },
        MAIN_SETTINGS: {
            TITLE: "設定",
            HINT: "提示：您可以在「設定」插件的設定中更改此設定部分的位置",
            ENABLE_CUSTOM_CSS: "啟用自定義 CSS",
            ENABLE_CUSTOM_CSS_NOTE: "加載您的自定義 CSS",
            ENABLE_REACT_DEVTOOLS: "啟用 React 開發者工具",
            ENABLE_REACT_DEVTOOLS_NOTE: "需要完全重新啟動",
            WINDOW_FRAME: {
                DISABLE_FRAME: "禁用窗口框架",
                NATIVE_TITLEBAR: "使用 Windows 原生標題欄而不是 Discord 的自定義標題欄"
            },
            WINDOW_FRAME_NOTE: "需要完全重新啟動",
            TRANSPARENT_WINDOW: "啟用窗口透明度",
            TRANSPARENT_WINDOW_NOTE: "您需要一個支持透明度的主題，否則此功能不會生效。將阻止窗口可調整大小！需要完全重新啟動",
            CTRL_Q: "註冊 Ctrl+Q 作為關閉 Discord 的快捷鍵（Alt+F4 的替代方案）",
            CTRL_Q_NOTE: "需要完全重新啟動",
            DISABLE_MIN_SIZE: "禁用最小窗口大小",
            DISABLE_MIN_SIZE_NOTE: "需要完全重新啟動"
        },
        BACKUP_RESTORE: {
            SIDEBAR: "備份與恢復",
            TITLE: "備份與恢復",
            WARNING: "警告",
            WARNING_MESSAGE: "導入設定文件將覆蓋您當前的設定。",
            DESCRIPTION: "您可以將 Vencord 設定導出為 JSON 文件。這允許您輕鬆地將設定傳輸到另一台設備，或在重新安裝 Vencord 或 Discord 後恢復設定。",
            EXPORT_CONTAINS: "設定導出包含：",
            CUSTOM_QUICKCSS: "自定義 QuickCSS",
            THEME_LINKS: "主題鏈接",
            PLUGIN_SETTINGS: "插件設定",
            IMPORT_BUTTON: "導入設定",
            EXPORT_BUTTON: "導出設定"
        },
        CLOUD: {
            SIDEBAR: "雲",
            TITLE: "Vencord 雲",
            SETTINGS_TITLE: "雲設定",
            DESCRIPTION: "Vencord 配有雲集成功能，可提供跨設備設定同步等好處。它尊重您的隱私，且源代碼採用 AGPL 3.0 許可，因此您可以自行託管。",
            ENABLE_INTEGRATION: "啟用雲集成",
            INTEGRATION_NOTE: "如果您尚未設置雲集成，這將請求授權。",
            BACKEND_URL: "後端 URL",
            BACKEND_URL_DESCRIPTION: "使用雲集成時要使用的後端。",
            REAUTHORIZE: "重新授權",
            ERASE_DATA: "清除所有數據",
            ERASE_CONFIRM: "您確定嗎？",
            ERASE_CONFIRM_MESSAGE: "一旦數據被清除，我們無法恢復。這是不可逆的！",
            ERASE_BUTTON: "清除它！",
            ERASE_CANCEL: "取消",
            ERASE_FAILED: "無法清除所有數據（API 返回 {status}），請聯繫支持。",
            ERASE_SUCCESS: "成功清除所有數據。",
            SYNC_TITLE: "設定同步",
            SYNC_DESCRIPTION: "將您的設定同步到雲端。這允許在多個設備之間輕鬆同步，幾乎不需要額外努力。",
            SYNC_ENABLE: "設定同步",
            SYNC_TO_CLOUD: "同步到雲端",
            SYNC_FROM_CLOUD: "從雲端同步",
            SYNC_FROM_CLOUD_TIP: "這將用雲端的設定覆蓋您的本地設定。謹慎使用！",
            DELETE_CLOUD: "刪除雲端設定",
            INVALID_URL: "無效的 URL"
        },
        NOTIFICATION: {
            TITLE: "通知設定",
            STYLE: "通知樣式",
            PERMISSION_DENIED: "桌面通知權限被拒絕",
            PERMISSION_DENIED_MESSAGE: "您已拒絕通知權限。因此，桌面通知將不起作用！",
            STYLE_DESCRIPTION: "一些插件可能會向您顯示通知。這些通知有兩種樣式：",
            VENCORD_NOTIFICATIONS: "Vencord 通知：這些是應用內通知",
            DESKTOP_NOTIFICATIONS: "桌面通知：原生桌面通知（如當您收到 ping 時）",
            STYLE_OPTIONS: {
                NOT_FOCUSED: "僅在 Discord 未聚焦時使用桌面通知",
                ALWAYS: "始終使用桌面通知",
                NEVER: "始終使用 Vencord 通知"
            },
            POSITION: "通知位置",
            POSITION_OPTIONS: {
                BOTTOM_RIGHT: "右下角",
                TOP_RIGHT: "右上角"
            },
            TIMEOUT: "通知超時",
            TIMEOUT_NOTE: "設置為 0s 永不自動超時",
            LOG_LIMIT: "通知日誌限制",
            LOG_LIMIT_DESCRIPTION: "在舊通知被移除前，要保存在日誌中的通知數量。設置為 0 禁用通知日誌，設置為 ∞ 永不自動移除舊通知",
            VIEW_LOG: "查看通知日誌"
        },
        THEMES: {
            SIDEBAR: "主題",
            TITLE: "主題",
            LOCAL_THEMES: "本地主題",
            ONLINE_THEMES: "線上主題",
            FIND_THEMES: "尋找主題：",
            BD_THEMES: "BetterDiscord 主題",
            GITHUB: "GitHub",
            THEME_NOTE: "如果使用 BD 網站，點擊「下載」並將下載的 .theme.css 文件放入您的主題文件夾。",
            UPLOAD_THEME: "上傳主題",
            OPEN_FOLDER: "打開主題文件夾",
            LOAD_MISSING: "加載缺失的主題",
            EDIT_QUICKCSS: "編輯 QuickCSS",
            EDIT_CLIENTTHEME: "編輯 ClientTheme",
            PASTE_LINKS: "在此處粘貼 css 文件鏈接",
            ONE_PER_LINE: "每行一個鏈接",
            THEME_PREFIX: "您可以在行前添加 @light 或 @dark 前綴，根據您的 Discord 主題切換它們",
            USE_DIRECT_LINKS: "確保使用直接鏈接到文件（原始或 github.io）！",
            VALIDATOR: "驗證器",
            VALIDATOR_NOTE: "此部分將告訴您您的主題是否能夠成功加載",
            NOT_CSS_FILE: "不是 CSS 文件。請記得使用原始鏈接！",
            CHECKING: "檢查中...",
            ERROR: "錯誤",
            VALID: "有效！",
            WEBSITE: "網站",
            DISCORD_SERVER: "Discord 伺服器",
            INVALID_INVITE: "無效或已過期的邀請",
            THEME_LINKS: "主題鏈接"
        },
        UPDATER: {
            SIDEBAR: "更新程序",
            TITLE: "更新程序",
            UPDATER_SETTINGS: "更新程序設定",
            AUTO_UPDATE: "自動更新",
            AUTO_UPDATE_NOTE: "無需確認提示自動更新 Vencord",
            AUTO_UPDATE_NOTIFICATION: "在自動更新完成時獲取通知",
            AUTO_UPDATE_NOTIFICATION_NOTE: "在 Vencord 自動更新時顯示通知",
            REPO: "倉庫",
            UPDATES: "更新",
            UP_TO_DATE: "已是最新！",
            UPDATE_AVAILABLE: "有 1 個更新",
            UPDATES_AVAILABLE: "有 {count} 個更新",
            UPDATE_NOW: "立即更新",
            CHECK_UPDATES: "檢查更新",
            NO_UPDATES: "未找到更新！",
            NEWER_LOCAL: "您的本地副本有更新的提交。請暫存或重置它們。",
            FAILED_CHECK: "檢查更新失敗。請查看控制台了解更多信息",
            UNKNOWN_ERROR: "發生未知錯誤",
            UPDATE_SUCCESS: "更新成功！",
            RESTART_PROMPT: "更新成功。立即重新啟動以應用更改？",
            RESTART: "重新啟動",
            LATER: "暫時不要！",
            FAILED_RETRIEVE: "獲取失敗 - 請查看控制台",
            LOADING: "加載中..."
        },
        PLUGINS: {
            SIDEBAR: "插件",
            TITLE: "插件",
            SEARCH: "搜尋插件...",
            DISCORD: "Discord 插件",
            USERPLUGINS: "用戶插件",
            FOLDER: "插件文件夾",
            PLUGIN_SETTINGS: "插件設定",
            PLUGIN_SETTINGS_DESCRIPTION: "配置已安裝的插件",
            USERPLUGINS_DIRECTORY: "用戶插件目錄",
            USERPLUGINS_DESCRIPTION: "您可以在此處放置自定義插件",
            USERPLUGINS_OPEN: "打開用戶插件目錄",
            USERPLUGINS_CREATE: "創建一個示例插件",
            API_DOCS: "API 文檔",
            API_DOCS_DESCRIPTION: "了解如何開發 Vencord 插件",
            ENABLE_ALL: "全部啟用",
            DISABLE_ALL: "全部禁用",
            PLUGIN_TOGGLED: "{count, plural, one {已切換 # 個插件} other {已切換 # 個插件}}",
            NO_PLUGINS_FOUND: "未找到插件",
            PLUGIN_MANAGEMENT: "插件管理",
            PLUGIN_MANAGEMENT_NOTE: "點擊卡片右側的開關來啟用或禁用插件。",
            PLUGIN_MANAGEMENT_COG_NOTE: "點擊齒輪或信息圖標以配置或了解更多關於插件的信息。",
            FILTERS: "過濾器",
            SHOW_ALL: "顯示全部",
            SHOW_ENABLED: "顯示已啟用",
            SHOW_DISABLED: "顯示已禁用",
            SHOW_NEW: "顯示新增插件",
            AUTHORS: "作者",
            VIEW_MORE_INFO: "查看更多信息",
            VIEW_SOURCE_CODE: "查看源代碼",
            NO_SETTINGS: "此插件沒有設置選項。",
            SAVE_CHANGES: "保存並關閉",
            RESTART_REQUIRED: "需要重新啟動！",
            RESTART_REQUIRED_NOTE: "以下插件需要重新啟動：",
            RESTART_NOW: "立即重新啟動",
            LATER: "稍後再說",
            REQUIRED_PLUGINS: "必需插件",
            LOOKING_FOR: "你是否在尋找：",
            ONLY_AVAILABLE_ON: "僅適用於",
            NO_SEARCH_RESULTS: "沒有符合搜尋條件的插件。",
            REQUIRED_BY: "此插件被以下插件所需要：",
            REQUIRED_FOR_FUNCTIONING: "此插件是Vencord正常運作所必需的。"
        }
    },

    // 添加插件描述的翻譯
    PLUGINS: {
        AccountPanelServerProfile: {
            name: "帳戶面板伺服器個人資料",
            description: "在左下角右鍵點擊您的帳戶面板，查看您在當前伺服器的個人資料"
        },
        AlwaysAnimate: {
            name: "總是動畫",
            description: "讓所有可動畫的元素都能動起來"
        },
        AlwaysExpandRoles: {
            name: "總是展開角色",
            description: "在個人資料彈出視窗中始終展開角色列表"
        },
        AlwaysTrust: {
            name: "總是信任",
            description: "移除惱人的不受信任域名和可疑文件彈出提示"
        },
        AnonymiseFileNames: {
            name: "匿名化文件名",
            description: "匿名化上傳的文件名稱"
        },
        BANger: {
            name: "自定義禁令圖片",
            description: "在禁令對話框中用自定義圖片替換GIF"
        },
        BetterFolders: {
            name: "更好的文件夾",
            description: "在專用側邊欄顯示伺服器文件夾，並添加文件夾相關改進"
        },
        BetterGifAltText: {
            name: "更好的GIF替代文本",
            description: "將GIF替代文本從簡單的'GIF'更改為包含gif標籤/文件名"
        },
        BetterGifPicker: {
            name: "更好的GIF選擇器",
            description: "讓gif選擇器默認打開收藏類別"
        },
        BetterNotesBox: {
            name: "更好的筆記框",
            description: "隱藏筆記或禁用拼寫檢查（在設定中配置!!）"
        },
        BetterRoleContext: {
            name: "更好的角色上下文",
            description: "添加複製角色顏色/編輯角色/以角色身份查看的選項"
        },
        BetterRoleDot: {
            name: "更好的角色點",
            description: "在RoleDot上複製角色顏色（無障礙設定）"
        },
        BetterSessions: {
            name: "更好的會話",
            description: "增強會話（裝置）選單。允許您查看精確時間戳，為每個會話自定義名稱並啟用一鍵複製您的令牌。"
        },
        BetterSettings: {
            name: "更好的設定",
            description: "增強您的設定選單打開體驗"
        },
        BetterUploadButton: {
            name: "更好的上傳按鈕",
            description: "單擊上傳，右鍵點擊打開選單"
        },
        BiggerStreamPreview: {
            name: "更大的直播預覽",
            description: "此插件允許您放大直播預覽"
        },
        BlurNSFW: {
            name: "模糊 NSFW",
            description: "在 NSFW 頻道中模糊附件直到懸停"
        },
        CallTimer: {
            name: "通話計時器",
            description: "為語音通話添加計時器"
        },
        ClearURLs: {
            name: "清除 URL",
            description: "從 URL 中移除跟踪垃圾"
        },
        ClientTheme: {
            name: "客戶端主題",
            description: "重新創建舊的客戶端主題實驗。為您的 Discord 客戶端主題添加顏色"
        },
        ColorSighted: {
            name: "色彩感知",
            description: "從狀態中移除色盲友好圖標，就像 2015-2017 年的 Discord"
        },
        ConsoleJanitor: {
            name: "控制台清潔工",
            description: "禁用煩人的控制台訊息/錯誤"
        },
        ConsoleShortcuts: {
            name: "控制台快捷方式",
            description: "為控制台上的許多功能添加更短的別名"
        },
        CopyEmojisMarkdown: {
            name: "複製表情符號標記",
            description: "允許您將表情符號複製為格式化字符串"
        },
        CustomCSS: {
            name: "自定義CSS",
            description: "允許您安裝自定義CSS。"
        },
        DisableDMCallIdle: {
            name: "禁用私信通話閒置",
            description: "防止Discord檢測您在私信通話中的閒置狀態"
        },
        FakeDeafen: {
            name: "假裝耳聾",
            description: "允許您在顯示為耳聾的同時聽到他人"
        },
        FakeNitro: {
            name: "假Nitro",
            description: "通過插件使用需要Nitro的功能"
        },
        FavoriteGifs: {
            name: "收藏GIF",
            description: "允許您將GIF保存為「收藏」"
        },
        FixYoutubeLinks: {
            name: "修復YouTube鏈接",
            description: "打開youtube.com鏈接而非youtube-nocookie.com"
        },
        ForceOwnerCrown: {
            name: "強制顯示擁有者皇冠",
            description: "即使服務器使用角色代替皇冠，也總是顯示擁有者皇冠"
        },
        ImageZoom: {
            name: "圖像縮放",
            description: "讓您可以放大圖像"
        },
        InvisibleChat: {
            name: "隱形聊天",
            description: "允許您發送懸停前不可見的消息（剝奪替代品）"
        },
        MessageLinkEmbeds: {
            name: "消息鏈接嵌入",
            description: "顯示您鏈接的消息的嵌入"
        },
        MessageLogger: {
            name: "訊息記錄器",
            description: "記錄已刪除和已編輯的訊息。"
        },
        MessageTags: {
            name: "消息標籤",
            description: "為消息添加標籤以便於查找"
        },
        MoreCommands: {
            name: "更多命令",
            description: "為Discord添加有用的命令"
        },
        MoreUserTags: {
            name: "更多用戶標籤",
            description: "為Discord添加更多用戶標籤！"
        },
        MuteNewGuild: {
            name: "靜音新公會",
            description: "自動靜音新加入的公會"
        },
        NoF1: {
            name: "禁用F1",
            description: "禁用F1幫助快捷鍵"
        },
        NoReplyMention: {
            name: "回復不提及",
            description: "使Discord默認在回復時不提及"
        },
        PermissionsViewer: {
            name: "權限查看器",
            description: "查看頻道中用戶或您自己的權限。"
        },
        PictureInPicture: {
            name: "畫中畫",
            description: "為流媒體和視頻添加畫中畫支持"
        },
        PlatformIndicators: {
            name: "平台指示器",
            description: "顯示其他用戶正在使用的平台。"
        },
        Settings: {
            name: "設定",
            description: "添加一個打開Vencord設定的按鈕。"
        }
    }
};

// 简体中文
const zhCN: TranslationObject = {
    SETTINGS: {
        SIDEBAR_HEADER: "Vencord",
        SIDEBAR: "Vencord",
        VENCORD_SETTINGS: "Vencord 设置",
        LANGUAGE: "语言",
        LANGUAGE_DESCRIPTION: "选择 Vencord 界面的语言",
        LANGUAGES: {
            "en-US": "English",
            "zh-TW": "繁体中文",
            "zh-CN": "简体中文"
        },
        TAB_ERROR: "无法渲染{tab}标签页。如果此问题持续存在，请尝试使用安装程序重新安装！",
        DONATIONS: {
            TITLE: "捐赠",
            SUBTITLE: "感谢您的捐赠！",
            DESCRIPTION: "您可以随时通过消息 @vending.machine 来管理您的特权。",
            SUPPORT_PROJECT: "支持项目",
            SUPPORT_DESCRIPTION: "请考虑通过捐赠来支持 Vencord 的开发！"
        },
        CONTRIBUTIONS: {
            TITLE: "贡献",
            SUBTITLE: "感谢您的贡献！",
            DESCRIPTION: "由于您对 Vencord 做出了贡献，您现在拥有一个很酷的新徽章！",
            BUTTON: "查看您的贡献"
        },
        QUICK_ACTIONS: {
            TITLE: "快捷操作",
            NOTIFICATION_LOG: "通知日志",
            EDIT_QUICKCSS: "编辑 QuickCSS",
            RELAUNCH_DISCORD: "重启 Discord",
            OPEN_SETTINGS_FOLDER: "打开设置文件夹",
            VIEW_SOURCE_CODE: "查看源代码"
        },
        MAIN_SETTINGS: {
            TITLE: "设置",
            HINT: "提示：您可以在「设置」插件的设置中更改此设置部分的位置",
            ENABLE_CUSTOM_CSS: "启用自定义 CSS",
            ENABLE_CUSTOM_CSS_NOTE: "加载您的自定义 CSS",
            ENABLE_REACT_DEVTOOLS: "启用 React 开发者工具",
            ENABLE_REACT_DEVTOOLS_NOTE: "需要完全重启",
            WINDOW_FRAME: {
                DISABLE_FRAME: "禁用窗口框架",
                NATIVE_TITLEBAR: "使用 Windows 原生标题栏而不是 Discord 的自定义标题栏"
            },
            WINDOW_FRAME_NOTE: "需要完全重启",
            TRANSPARENT_WINDOW: "启用窗口透明",
            TRANSPARENT_WINDOW_NOTE: "您需要一个支持透明的主题，否则此功能不会生效。将阻止窗口调整大小！需要完全重启",
            CTRL_Q: "注册 Ctrl+Q 作为关闭 Discord 的快捷键（Alt+F4 的替代方案）",
            CTRL_Q_NOTE: "需要完全重启",
            DISABLE_MIN_SIZE: "禁用最小窗口大小",
            DISABLE_MIN_SIZE_NOTE: "需要完全重启"
        },
        BACKUP_RESTORE: {
            SIDEBAR: "备份与恢复",
            TITLE: "备份与恢复",
            WARNING: "警告",
            WARNING_MESSAGE: "导入设置文件将覆盖您当前的设置。",
            DESCRIPTION: "您可以将 Vencord 设置导出为 JSON 文件。这允许您轻松地将设置传输到另一台设备，或在重新安装 Vencord 或 Discord 后恢复设置。",
            EXPORT_CONTAINS: "设置导出包含：",
            CUSTOM_QUICKCSS: "自定义 QuickCSS",
            THEME_LINKS: "主题链接",
            PLUGIN_SETTINGS: "插件设置",
            IMPORT_BUTTON: "导入设置",
            EXPORT_BUTTON: "导出设置"
        },
        CLOUD: {
            SIDEBAR: "云",
            TITLE: "Vencord 云",
            SETTINGS_TITLE: "云设置",
            DESCRIPTION: "Vencord 配有云集成功能，可提供跨设备设置同步等功能。它尊重您的隐私，且源代码采用 AGPL 3.0 许可，因此您可以自行托管。",
            ENABLE_INTEGRATION: "启用云集成",
            INTEGRATION_NOTE: "如果您尚未设置云集成，这将请求授权。",
            BACKEND_URL: "后端 URL",
            BACKEND_URL_DESCRIPTION: "使用云集成时要使用的后端。",
            REAUTHORIZE: "重新授权",
            ERASE_DATA: "清除所有数据",
            ERASE_CONFIRM: "您确定吗？",
            ERASE_CONFIRM_MESSAGE: "一旦数据被清除，我们无法恢复。这是不可逆的！",
            ERASE_BUTTON: "清除它！",
            ERASE_CANCEL: "取消",
            ERASE_FAILED: "无法清除所有数据（API 返回 {status}），请联系支持。",
            ERASE_SUCCESS: "成功清除所有数据。",
            SYNC_TITLE: "设置同步",
            SYNC_DESCRIPTION: "将您的设置同步到云端。这允许在多个设备之间轻松同步，几乎不需要额外努力。",
            SYNC_ENABLE: "设置同步",
            SYNC_TO_CLOUD: "同步到云端",
            SYNC_FROM_CLOUD: "从云端同步",
            SYNC_FROM_CLOUD_TIP: "这将用云端的设置覆盖您的本地设置。谨慎使用！",
            DELETE_CLOUD: "删除云端设置",
            INVALID_URL: "无效的 URL"
        },
        NOTIFICATION: {
            TITLE: "通知设置",
            STYLE: "通知样式",
            PERMISSION_DENIED: "桌面通知权限被拒绝",
            PERMISSION_DENIED_MESSAGE: "您已拒绝通知权限。因此，桌面通知将不起作用！",
            STYLE_DESCRIPTION: "一些插件可能会向您显示通知。这些通知有两种样式：",
            VENCORD_NOTIFICATIONS: "Vencord 通知：这些是应用内通知",
            DESKTOP_NOTIFICATIONS: "桌面通知：原生桌面通知（如当您收到 ping 时）",
            STYLE_OPTIONS: {
                NOT_FOCUSED: "仅在 Discord 未聚焦时使用桌面通知",
                ALWAYS: "始终使用桌面通知",
                NEVER: "始终使用 Vencord 通知"
            },
            POSITION: "通知位置",
            POSITION_OPTIONS: {
                BOTTOM_RIGHT: "右下角",
                TOP_RIGHT: "右上角"
            },
            TIMEOUT: "通知超时",
            TIMEOUT_NOTE: "设置为 0s 永不自动超时",
            LOG_LIMIT: "通知日志限制",
            LOG_LIMIT_DESCRIPTION: "在旧通知被移除前，要保存在日志中的通知数量。设置为 0 禁用通知日志，设置为 ∞ 永不自动移除旧通知",
            VIEW_LOG: "查看通知日志"
        },
        THEMES: {
            SIDEBAR: "主题",
            TITLE: "主题",
            LOCAL_THEMES: "本地主题",
            ONLINE_THEMES: "在线主题",
            FIND_THEMES: "寻找主题：",
            BD_THEMES: "BetterDiscord 主题",
            GITHUB: "GitHub",
            THEME_NOTE: "如果使用 BD 网站，点击「下载」并将下载的 .theme.css 文件放入您的主题文件夹。",
            UPLOAD_THEME: "上传主题",
            OPEN_FOLDER: "打开主题文件夹",
            LOAD_MISSING: "加载缺失的主题",
            EDIT_QUICKCSS: "编辑 QuickCSS",
            EDIT_CLIENTTHEME: "编辑 ClientTheme",
            PASTE_LINKS: "在此处粘贴 css 文件链接",
            ONE_PER_LINE: "每行一个链接",
            THEME_PREFIX: "您可以在行前添加 @light 或 @dark 前缀，根据您的 Discord 主题切换它们",
            USE_DIRECT_LINKS: "确保使用直接链接到文件（原始或 github.io）！",
            VALIDATOR: "验证器",
            VALIDATOR_NOTE: "此部分将告诉您您的主题是否能够成功加载",
            NOT_CSS_FILE: "不是 CSS 文件。请记得使用原始链接！",
            CHECKING: "检查中...",
            ERROR: "错误",
            VALID: "有效！",
            WEBSITE: "网站",
            DISCORD_SERVER: "Discord 服务器",
            INVALID_INVITE: "无效或已过期的邀请",
            THEME_LINKS: "主题链接"
        },
        UPDATER: {
            SIDEBAR: "更新程序",
            TITLE: "更新程序",
            UPDATER_SETTINGS: "更新程序设置",
            AUTO_UPDATE: "自动更新",
            AUTO_UPDATE_NOTE: "无需确认提示自动更新 Vencord",
            AUTO_UPDATE_NOTIFICATION: "在自动更新完成时获取通知",
            AUTO_UPDATE_NOTIFICATION_NOTE: "在 Vencord 自动更新时显示通知",
            REPO: "仓库",
            UPDATES: "更新",
            UP_TO_DATE: "已是最新！",
            UPDATE_AVAILABLE: "有 1 个更新",
            UPDATES_AVAILABLE: "有 {count} 个更新",
            UPDATE_NOW: "立即更新",
            CHECK_UPDATES: "检查更新",
            NO_UPDATES: "未找到更新！",
            NEWER_LOCAL: "您的本地副本有更新的提交。请暂存或重置它们。",
            FAILED_CHECK: "检查更新失败。请查看控制台了解更多信息",
            UNKNOWN_ERROR: "发生未知错误",
            UPDATE_SUCCESS: "更新成功！",
            RESTART_PROMPT: "更新成功。立即重新启动以应用更改？",
            RESTART: "重新启动",
            LATER: "暂时不要！",
            FAILED_RETRIEVE: "获取失败 - 请查看控制台",
            LOADING: "加载中..."
        },
        PLUGINS: {
            SIDEBAR: "插件",
            TITLE: "插件",
            SEARCH: "搜索插件...",
            DISCORD: "Discord 插件",
            USERPLUGINS: "用户插件",
            FOLDER: "插件文件夹",
            PLUGIN_SETTINGS: "插件设置",
            PLUGIN_SETTINGS_DESCRIPTION: "配置已安装的插件",
            USERPLUGINS_DIRECTORY: "用户插件目录",
            USERPLUGINS_DESCRIPTION: "您可以在此处放置自定义插件",
            USERPLUGINS_OPEN: "打开用户插件目录",
            USERPLUGINS_CREATE: "创建一个示例插件",
            API_DOCS: "API 文档",
            API_DOCS_DESCRIPTION: "了解如何开发 Vencord 插件",
            ENABLE_ALL: "全部启用",
            DISABLE_ALL: "全部禁用",
            PLUGIN_TOGGLED: "{count, plural, one {已切换 # 个插件} other {已切换 # 个插件}}",
            NO_PLUGINS_FOUND: "未找到插件",
            PLUGIN_MANAGEMENT: "插件管理",
            PLUGIN_MANAGEMENT_NOTE: "点击卡片右侧的开关来启用或禁用插件。",
            PLUGIN_MANAGEMENT_COG_NOTE: "点击齿轮或信息图标以配置或了解更多关于插件的信息。",
            FILTERS: "过滤器",
            SHOW_ALL: "显示全部",
            SHOW_ENABLED: "显示已启用",
            SHOW_DISABLED: "显示已禁用",
            SHOW_NEW: "显示新增插件",
            AUTHORS: "作者",
            VIEW_MORE_INFO: "查看更多信息",
            VIEW_SOURCE_CODE: "查看源代码",
            NO_SETTINGS: "此插件没有设置选项。",
            SAVE_CHANGES: "保存并关闭",
            RESTART_REQUIRED: "需要重新启动！",
            RESTART_REQUIRED_NOTE: "以下插件需要重新启动：",
            RESTART_NOW: "立即重新启动",
            LATER: "稍后再说",
            REQUIRED_PLUGINS: "必需插件",
            LOOKING_FOR: "您是否在寻找：",
            ONLY_AVAILABLE_ON: "仅适用于",
            NO_SEARCH_RESULTS: "没有符合搜索条件的插件。",
            REQUIRED_BY: "此插件被以下插件所需要：",
            REQUIRED_FOR_FUNCTIONING: "此插件是Vencord正常运作所必需的。"
        }
    },

    // 添加插件描述的翻译
    PLUGINS: {
        AccountPanelServerProfile: {
            name: "账户面板服务器资料",
            description: "在左下角右键点击您的账户面板，查看您在当前服务器的资料"
        },
        AlwaysAnimate: {
            name: "总是动画",
            description: "让所有可动画的元素都能动起来"
        },
        AlwaysExpandRoles: {
            name: "总是展开角色",
            description: "在个人资料弹出窗口中始终展开角色列表"
        },
        AlwaysTrust: {
            name: "总是信任",
            description: "移除恼人的不受信任域名和可疑文件弹出提示"
        },
        AnonymiseFileNames: {
            name: "匿名化文件名",
            description: "匿名化上传的文件名称"
        },
        BANger: {
            name: "自定义禁令图片",
            description: "在禁令对话框中用自定义图片替换GIF"
        },
        BetterFolders: {
            name: "更好的文件夹",
            description: "在专用侧边栏显示服务器文件夹，并添加文件夹相关改进"
        },
        BetterGifAltText: {
            name: "更好的GIF替代文本",
            description: "将GIF替代文本从简单的'GIF'更改为包含gif标签/文件名"
        },
        BetterGifPicker: {
            name: "更好的GIF选择器",
            description: "让gif选择器默认打开收藏类别"
        },
        BetterNotesBox: {
            name: "更好的笔记框",
            description: "隐藏笔记或禁用拼写检查（在设置中配置!!）"
        },
        BetterRoleContext: {
            name: "更好的角色上下文",
            description: "添加复制角色颜色/编辑角色/以角色身份查看的选项"
        },
        BetterRoleDot: {
            name: "更好的角色点",
            description: "在RoleDot上复制角色颜色（无障碍设置）"
        },
        BetterSessions: {
            name: "更好的会话",
            description: "增强会话（设备）菜单。允许您查看精确时间戳，为每个会话自定义名称并启用一键复制您的令牌。"
        },
        BetterSettings: {
            name: "更好的设置",
            description: "增强您的设置菜单打开体验"
        },
        BetterUploadButton: {
            name: "更好的上传按钮",
            description: "单击上传，右键点击打开菜单"
        },
        BiggerStreamPreview: {
            name: "更大的直播预览",
            description: "此插件允许您放大直播预览"
        },
        BlurNSFW: {
            name: "模糊 NSFW",
            description: "在 NSFW 频道中模糊附件直到悬停"
        },
        CallTimer: {
            name: "通话计时器",
            description: "为语音通话添加计时器"
        },
        ClearURLs: {
            name: "清除 URL",
            description: "从 URL 中移除跟踪垃圾"
        },
        ClientTheme: {
            name: "客户端主题",
            description: "重新创建旧的客户端主题实验。为您的 Discord 客户端主题添加颜色"
        },
        ColorSighted: {
            name: "色彩感知",
            description: "从状态中移除色盲友好图标，就像 2015-2017 年的 Discord"
        },
        ConsoleJanitor: {
            name: "控制台清洁工",
            description: "禁用烦人的控制台消息/错误"
        },
        ConsoleShortcuts: {
            name: "控制台快捷方式",
            description: "为控制台上的许多功能添加更短的别名"
        },
        CopyEmojisMarkdown: {
            name: "复制表情符号标记",
            description: "允许您将表情符号复制为格式化字符串"
        },
        CustomCSS: {
            name: "自定义CSS",
            description: "允许您安装自定义CSS。"
        },
        DisableDMCallIdle: {
            name: "禁用私信通话闲置",
            description: "防止Discord检测您在私信通话中的闲置状态"
        },
        FakeDeafen: {
            name: "假装耳聋",
            description: "允许您在显示为耳聋的同时听到他人"
        },
        FakeNitro: {
            name: "假Nitro",
            description: "通过插件使用需要Nitro的功能"
        },
        FavoriteGifs: {
            name: "收藏GIF",
            description: "允许您将GIF保存为「收藏」"
        },
        FixYoutubeLinks: {
            name: "修复YouTube链接",
            description: "打开youtube.com链接而非youtube-nocookie.com"
        },
        ForceOwnerCrown: {
            name: "强制显示拥有者皇冠",
            description: "即使服务器使用角色代替皇冠，也总是显示拥有者皇冠"
        },
        ImageZoom: {
            name: "图像缩放",
            description: "让您可以放大图像"
        },
        InvisibleChat: {
            name: "隐形聊天",
            description: "允许您发送悬停前不可见的消息（剧透替代品）"
        },
        MessageLinkEmbeds: {
            name: "消息链接嵌入",
            description: "显示您链接的消息的嵌入"
        },
        MessageLogger: {
            name: "消息记录器",
            description: "记录已删除和已编辑的消息。"
        },
        MessageTags: {
            name: "消息标签",
            description: "为消息添加标签以便于查找"
        },
        MoreCommands: {
            name: "更多命令",
            description: "为Discord添加有用的命令"
        },
        MoreUserTags: {
            name: "更多用户标签",
            description: "为Discord添加更多用户标签！"
        },
        MuteNewGuild: {
            name: "静音新服务器",
            description: "自动静音新加入的服务器"
        },
        NoF1: {
            name: "禁用F1",
            description: "禁用F1帮助快捷键"
        },
        NoReplyMention: {
            name: "回复不提及",
            description: "使Discord默认在回复时不提及"
        },
        PermissionsViewer: {
            name: "权限查看器",
            description: "查看频道中用户或您自己的权限。"
        },
        PictureInPicture: {
            name: "画中画",
            description: "为流媒体和视频添加画中画支持"
        },
        PlatformIndicators: {
            name: "平台指示器",
            description: "显示其他用户正在使用的平台。"
        },
        Settings: {
            name: "设置",
            description: "添加一个打开Vencord设置的按钮。"
        }
    }
};

// 翻譯集合
const translations: Record<Language, TranslationObject> = {
    "en-US": enUS,
    "zh-TW": zhTW,
    "zh-CN": zhCN
};

// 獲取當前語言
export function getCurrentLanguage(): Language {
    return (Settings.language || "en-US") as Language;
}

// 設置翻譯辭典的存取函數
function getNestedTranslation(obj: TranslationObject, key: string): string | TranslationObject {
    const parts = key.split(".");
    let current: string | TranslationObject = obj;

    for (const part of parts) {
        if (typeof current !== "object" || current === null) return key;
        current = current[part];
        if (current === undefined) return key;
    }

    return current;
}

// 獲取翻譯文本
export function i18n(key: string, replacements?: Record<string, string | number>): string {
    const lang = getCurrentLanguage();
    const translation = translations[lang] || translations["en-US"];

    let value = getNestedTranslation(translation, key);

    // 如果找不到翻譯，返回英文版本
    if (value === key && lang !== "en-US") {
        value = getNestedTranslation(translations["en-US"], key);
    }

    // 如果仍然找不到，返回原key
    if (typeof value !== "string") return key;

    // 處理替換
    if (replacements) {
        return value.replace(/\{(\w+)\}/g, (match, name) => {
            return (replacements[name] !== undefined) ? String(replacements[name]) : match;
        });
    }

    return value;
}
