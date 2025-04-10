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
import { Flex } from "@components/Flex";
import { Margins } from "@utils/margins";
import { classes } from "@utils/misc";
import { downloadSettingsBackup, uploadSettingsBackup } from "@utils/settingsSync";
import { Button, Card, Text } from "@webpack/common";

import { SettingsTab, wrapTab } from "./shared";

function BackupRestoreTab() {
    return (
        <SettingsTab title={i18n("SETTINGS.BACKUP_RESTORE.TITLE")}>
            <Card className={classes("vc-settings-card", "vc-backup-restore-card")}>
                <Flex flexDirection="column">
                    <strong>{i18n("SETTINGS.BACKUP_RESTORE.WARNING")}</strong>
                    <span>{i18n("SETTINGS.BACKUP_RESTORE.WARNING_MESSAGE")}</span>
                </Flex>
            </Card>
            <Text variant="text-md/normal" className={Margins.bottom8}>
                {i18n("SETTINGS.BACKUP_RESTORE.DESCRIPTION")}
            </Text>
            <Text variant="text-md/normal" className={Margins.bottom8}>
                {i18n("SETTINGS.BACKUP_RESTORE.EXPORT_CONTAINS")}
                <ul>
                    <li>&mdash; {i18n("SETTINGS.BACKUP_RESTORE.CUSTOM_QUICKCSS")}</li>
                    <li>&mdash; {i18n("SETTINGS.BACKUP_RESTORE.THEME_LINKS")}</li>
                    <li>&mdash; {i18n("SETTINGS.BACKUP_RESTORE.PLUGIN_SETTINGS")}</li>
                </ul>
            </Text>
            <Flex>
                <Button
                    onClick={() => uploadSettingsBackup()}
                    size={Button.Sizes.SMALL}
                >
                    {i18n("SETTINGS.BACKUP_RESTORE.IMPORT_BUTTON")}
                </Button>
                <Button
                    onClick={downloadSettingsBackup}
                    size={Button.Sizes.SMALL}
                >
                    {i18n("SETTINGS.BACKUP_RESTORE.EXPORT_BUTTON")}
                </Button>
            </Flex>
        </SettingsTab>
    );
}

export default wrapTab(BackupRestoreTab, "Backup & Restore");
