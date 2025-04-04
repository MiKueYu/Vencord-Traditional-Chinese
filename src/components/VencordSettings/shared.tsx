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

import "./settingsStyles.css";
import "./themesStyles.css";

import { i18n } from "@api/i18n";
import ErrorBoundary from "@components/ErrorBoundary";
import { handleComponentFailed } from "@components/handleComponentFailed";
import { Margins } from "@utils/margins";
import { onlyOnce } from "@utils/onlyOnce";
import { Forms, Text, React } from "@webpack/common";

// 簡單的界面定義
interface SettingsTabProps {
    title: string;
    children?: any;
}

export function SettingsTab({ title, children }: SettingsTabProps) {
    return (
        <Forms.FormSection>
            <Text
                variant="heading-lg/semibold"
                tag="h2"
                className={Margins.bottom16}
            >
                {title}
            </Text>

            {children}
        </Forms.FormSection>
    );
}

export const handleSettingsTabError = onlyOnce(handleComponentFailed);

export function wrapTab(component: any, tab: string) {
    return ErrorBoundary.wrap(component, {
        message: i18n("SETTINGS.TAB_ERROR", { tab }),
        onError: handleSettingsTabError,
    });
}
