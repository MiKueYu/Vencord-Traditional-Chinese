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

import { showNotification } from "@api/Notifications";
import { Settings, useSettings } from "@api/Settings";
import { CheckedTextInput } from "@components/CheckedTextInput";
import { Grid } from "@components/Grid";
import { Link } from "@components/Link";
import { authorizeCloud, cloudLogger, deauthorizeCloud, getCloudAuth, getCloudUrl } from "@utils/cloud";
import { Margins } from "@utils/margins";
import { deleteCloudSettings, getCloudSettings, putCloudSettings } from "@utils/settingsSync";
import { Alerts, Button, Forms, Switch, Tooltip } from "@webpack/common";
import { i18n } from "@api/i18n";

import { SettingsTab, wrapTab } from "./shared";

function validateUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return i18n("SETTINGS.CLOUD.INVALID_URL");
    }
}

async function eraseAllData() {
    const res = await fetch(new URL("/v1/", getCloudUrl()), {
        method: "DELETE",
        headers: { Authorization: await getCloudAuth() }
    });

    if (!res.ok) {
        cloudLogger.error(`Failed to erase data, API returned ${res.status}`);
        showNotification({
            title: i18n("SETTINGS.CLOUD.TITLE"),
            body: i18n("SETTINGS.CLOUD.ERASE_FAILED", { status: res.status }),
            color: "var(--red-360)"
        });
        return;
    }

    Settings.cloud.authenticated = false;
    await deauthorizeCloud();

    showNotification({
        title: i18n("SETTINGS.CLOUD.TITLE"),
        body: i18n("SETTINGS.CLOUD.ERASE_SUCCESS"),
        color: "var(--green-360)"
    });
}

function SettingsSyncSection() {
    const { cloud } = useSettings(["cloud.authenticated", "cloud.settingsSync"]);
    const sectionEnabled = cloud.authenticated && cloud.settingsSync;

    return (
        <Forms.FormSection title={i18n("SETTINGS.CLOUD.SYNC_TITLE")} className={Margins.top16}>
            <Forms.FormText variant="text-md/normal" className={Margins.bottom20}>
                {i18n("SETTINGS.CLOUD.SYNC_DESCRIPTION")}
            </Forms.FormText>
            <Switch
                key="cloud-sync"
                disabled={!cloud.authenticated}
                value={cloud.settingsSync}
                onChange={v => { cloud.settingsSync = v; }}
            >
                {i18n("SETTINGS.CLOUD.SYNC_ENABLE")}
            </Switch>
            <div className="vc-cloud-settings-sync-grid">
                <Button
                    size={Button.Sizes.SMALL}
                    disabled={!sectionEnabled}
                    onClick={() => putCloudSettings(true)}
                >
                    {i18n("SETTINGS.CLOUD.SYNC_TO_CLOUD")}
                </Button>
                <Tooltip text={i18n("SETTINGS.CLOUD.SYNC_FROM_CLOUD_TIP")}>
                    {({ onMouseLeave, onMouseEnter }) => (
                        <Button
                            onMouseLeave={onMouseLeave}
                            onMouseEnter={onMouseEnter}
                            size={Button.Sizes.SMALL}
                            color={Button.Colors.RED}
                            disabled={!sectionEnabled}
                            onClick={() => getCloudSettings(true, true)}
                        >
                            {i18n("SETTINGS.CLOUD.SYNC_FROM_CLOUD")}
                        </Button>
                    )}
                </Tooltip>
                <Button
                    size={Button.Sizes.SMALL}
                    color={Button.Colors.RED}
                    disabled={!sectionEnabled}
                    onClick={() => deleteCloudSettings()}
                >
                    {i18n("SETTINGS.CLOUD.DELETE_CLOUD")}
                </Button>
            </div>
        </Forms.FormSection>
    );
}

function CloudTab() {
    const settings = useSettings(["cloud.authenticated", "cloud.url"]);

    return (
        <SettingsTab title={i18n("SETTINGS.CLOUD.TITLE")}>
            <Forms.FormSection title={i18n("SETTINGS.CLOUD.SETTINGS_TITLE")} className={Margins.top16}>
                <Forms.FormText variant="text-md/normal" className={Margins.bottom20}>
                    {i18n("SETTINGS.CLOUD.DESCRIPTION")} <Link href="https://vencord.dev/cloud/privacy">{i18n("SETTINGS.CLOUD.RESPECTS_PRIVACY")}</Link>, {i18n("SETTINGS.CLOUD.AND")}
                    <Link href="https://github.com/Vencord/Backend">{i18n("SETTINGS.CLOUD.SOURCE_CODE")}</Link> {i18n("SETTINGS.CLOUD.LICENSE_INFO")}
                </Forms.FormText>
                <Switch
                    key="backend"
                    value={settings.cloud.authenticated}
                    onChange={v => {
                        if (v)
                            authorizeCloud();
                        else
                            settings.cloud.authenticated = v;
                    }}
                    note={i18n("SETTINGS.CLOUD.INTEGRATION_NOTE")}
                >
                    {i18n("SETTINGS.CLOUD.ENABLE_INTEGRATION")}
                </Switch>
                <Forms.FormTitle tag="h5">{i18n("SETTINGS.CLOUD.BACKEND_URL")}</Forms.FormTitle>
                <Forms.FormText className={Margins.bottom8}>
                    {i18n("SETTINGS.CLOUD.BACKEND_URL_DESCRIPTION")}
                </Forms.FormText>
                <CheckedTextInput
                    key="backendUrl"
                    value={settings.cloud.url}
                    onChange={async v => {
                        settings.cloud.url = v;
                        settings.cloud.authenticated = false;
                        deauthorizeCloud();
                    }}
                    validate={validateUrl}
                />

                <Grid columns={2} gap="1em" className={Margins.top8}>
                    <Button
                        size={Button.Sizes.MEDIUM}
                        disabled={!settings.cloud.authenticated}
                        onClick={async () => {
                            await deauthorizeCloud();
                            settings.cloud.authenticated = false;
                            await authorizeCloud();
                        }}
                    >
                        {i18n("SETTINGS.CLOUD.REAUTHORIZE")}
                    </Button>
                    <Button
                        size={Button.Sizes.MEDIUM}
                        color={Button.Colors.RED}
                        disabled={!settings.cloud.authenticated}
                        onClick={() => Alerts.show({
                            title: i18n("SETTINGS.CLOUD.ERASE_CONFIRM"),
                            body: i18n("SETTINGS.CLOUD.ERASE_CONFIRM_MESSAGE"),
                            onConfirm: eraseAllData,
                            confirmText: i18n("SETTINGS.CLOUD.ERASE_BUTTON"),
                            confirmColor: "vc-cloud-erase-data-danger-btn",
                            cancelText: i18n("SETTINGS.CLOUD.ERASE_CANCEL")
                        })}
                    >
                        {i18n("SETTINGS.CLOUD.ERASE_DATA")}
                    </Button>
                </Grid>

                <Forms.FormDivider className={Margins.top16} />
            </Forms.FormSection >
            <SettingsSyncSection />
        </SettingsTab>
    );
}

export default wrapTab(CloudTab, i18n("SETTINGS.CLOUD.TITLE"));
