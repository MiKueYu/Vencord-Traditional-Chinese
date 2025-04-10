/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
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
import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    receivedInput: {
        type: OptionType.STRING,
        description: i18n("PLUGINS.Translate.receivedInput"),
        default: "auto",
        hidden: true
    },
    receivedOutput: {
        type: OptionType.STRING,
        description: i18n("PLUGINS.Translate.receivedOutput"),
        default: "en",
        hidden: true
    },
    sentInput: {
        type: OptionType.STRING,
        description: i18n("PLUGINS.Translate.sentInput"),
        default: "auto",
        hidden: true
    },
    sentOutput: {
        type: OptionType.STRING,
        description: i18n("PLUGINS.Translate.sentOutput"),
        default: "en",
        hidden: true
    },

    showChatBarButton: {
        type: OptionType.BOOLEAN,
        description: i18n("PLUGINS.Translate.showChatBarButton"),
        default: true
    },
    service: {
        type: OptionType.SELECT,
        description: IS_WEB ? i18n("PLUGINS.Translate.service.description") : i18n("PLUGINS.Translate.service.end"),
        disabled: () => IS_WEB,
        options: [
            { label: "Google Translate", value: "google", default: true },
            { label: "DeepL Free", value: "deepl" },
            { label: "DeepL Pro", value: "deepl-pro" }
        ] as const,
        onChange: resetLanguageDefaults
    },
    deeplApiKey: {
        type: OptionType.STRING,
        description: "DeepL API key",
        default: "",
        placeholder: "Get your API key from https://deepl.com/your-account",
        disabled: () => IS_WEB
    },
    autoTranslate: {
        type: OptionType.BOOLEAN,
        description: i18n("PLUGINS.Translate.autoTranslate"),
        default: false
    },
    showAutoTranslateTooltip: {
        type: OptionType.BOOLEAN,
        description: i18n("PLUGINS.Translate.showAutoTranslateTooltip"),
        default: true
    },
}).withPrivateSettings<{
    showAutoTranslateAlert: boolean;
}>();

export function resetLanguageDefaults() {
    if (IS_WEB || settings.store.service === "google") {
        settings.store.receivedInput = "auto";
        settings.store.receivedOutput = "en";
        settings.store.sentInput = "auto";
        settings.store.sentOutput = "en";
    } else {
        settings.store.receivedInput = "";
        settings.store.receivedOutput = "en-us";
        settings.store.sentInput = "";
        settings.store.sentOutput = "en-us";
    }
}
