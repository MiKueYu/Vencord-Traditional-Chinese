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

import "./styles.css";

import * as DataStore from "@api/DataStore";
import { showNotice } from "@api/Notices";
import { Settings, useSettings } from "@api/Settings";
import { classNameFactory } from "@api/Styles";
import { CogWheel, InfoIcon } from "@components/Icons";
import { openPluginModal } from "@components/PluginSettings/PluginModal";
import { AddonCard } from "@components/VencordSettings/AddonCard";
import { SettingsTab } from "@components/VencordSettings/shared";
import { ChangeList } from "@utils/ChangeList";
import { proxyLazy } from "@utils/lazy";
import { Logger } from "@utils/Logger";
import { Margins } from "@utils/margins";
import { classes, isObjectEmpty } from "@utils/misc";
import { useAwaiter } from "@utils/react";
import { Plugin } from "@utils/types";
import { findByPropsLazy } from "@webpack";
import { Alerts, Button, Card, Forms, lodash, Parser, React, Select, Text, TextInput, Toasts, Tooltip, useMemo } from "@webpack/common";
import { JSX } from "react";

import Plugins, { ExcludedPlugins } from "~plugins";
import { getCurrentLanguage, i18n } from "@api/i18n";

// Avoid circular dependency
const { startDependenciesRecursive, startPlugin, stopPlugin } = proxyLazy(() => require("../../plugins"));

const cl = classNameFactory("vc-plugins-");
const logger = new Logger("PluginSettings", "#a6d189");

const InputStyles = findByPropsLazy("inputWrapper", "inputDefault", "error");
const ButtonClasses = findByPropsLazy("button", "disabled", "enabled");


function showErrorToast(message: string) {
    Toasts.show({
        message,
        type: Toasts.Type.FAILURE,
        id: Toasts.genId(),
        options: {
            position: Toasts.Position.BOTTOM
        }
    });
}

function ReloadRequiredCard({ required }: { required: boolean; }) {
    return (
        <Card className={cl("info-card", { "restart-card": required })}>
            {required ? (
                <>
                    <Forms.FormTitle tag="h5">{i18n("SETTINGS.PLUGINS.RESTART_REQUIRED")}</Forms.FormTitle>
                    <Forms.FormText className={cl("dep-text")}>
                        {i18n("SETTINGS.PLUGINS.RESTART_REQUIRED_NOTE")}
                    </Forms.FormText>
                    <Button onClick={() => location.reload()} className={cl("restart-button")}>
                        {i18n("SETTINGS.PLUGINS.RESTART_NOW")}
                    </Button>
                </>
            ) : (
                <>
                    <Forms.FormTitle tag="h5">{i18n("SETTINGS.PLUGINS.PLUGIN_MANAGEMENT")}</Forms.FormTitle>
                    <Forms.FormText>{i18n("SETTINGS.PLUGINS.PLUGIN_MANAGEMENT_NOTE")}</Forms.FormText>
                    <Forms.FormText>{i18n("SETTINGS.PLUGINS.PLUGIN_MANAGEMENT_COG_NOTE")}</Forms.FormText>
                </>
            )}
        </Card>
    );
}

interface PluginCardProps extends React.HTMLProps<HTMLDivElement> {
    plugin: Plugin;
    disabled: boolean;
    onRestartNeeded(name: string): void;
    isNew?: boolean;
}

export function PluginCard({ plugin, disabled, onRestartNeeded, onMouseEnter, onMouseLeave, isNew }: PluginCardProps) {
    const settings = Settings.plugins[plugin.name];
    const lang = getCurrentLanguage();

    const isEnabled = () => Vencord.Plugins.isPluginEnabled(plugin.name);

    // 獲取插件描述的翻譯，如果沒有翻譯則使用原始描述
    const getPluginDescription = () => {
        const translationKey = `PLUGINS.${plugin.name}.description`;
        const translatedDesc = i18n(translationKey);

        // 如果i18n返回的是原始key，表示沒有找到翻譯
        return translatedDesc === translationKey ? plugin.description : translatedDesc;
    };

    // 獲取插件名稱的翻譯，如果沒有翻譯則使用原始名稱
    const getPluginName = () => {
        const translationKey = `PLUGINS.${plugin.name}.name`;
        const translatedName = i18n(translationKey);
        return translatedName === translationKey ? plugin.name : translatedName;
    };

    function toggleEnabled() {
        const wasEnabled = isEnabled();

        // If we're enabling a plugin, make sure all deps are enabled recursively.
        if (!wasEnabled) {
            const { restartNeeded, failures } = startDependenciesRecursive(plugin);
            if (failures.length) {
                logger.error(`Failed to start dependencies for ${plugin.name}: ${failures.join(", ")}`);
                showNotice("Failed to start dependencies: " + failures.join(", "), "Close", () => null);
                return;
            } else if (restartNeeded) {
                // If any dependencies have patches, don't start the plugin yet.
                settings.enabled = true;
                onRestartNeeded(plugin.name);
                return;
            }
        }

        // if the plugin has patches, dont use stopPlugin/startPlugin. Wait for restart to apply changes.
        if (plugin.patches?.length) {
            settings.enabled = !wasEnabled;
            onRestartNeeded(plugin.name);
            return;
        }

        // If the plugin is enabled, but hasn't been started, then we can just toggle it off.
        if (wasEnabled && !plugin.started) {
            settings.enabled = !wasEnabled;
            return;
        }

        const result = wasEnabled ? stopPlugin(plugin) : startPlugin(plugin);

        if (!result) {
            settings.enabled = false;

            const msg = `Error while ${wasEnabled ? "stopping" : "starting"} plugin ${plugin.name}`;
            logger.error(msg);
            showErrorToast(msg);
            return;
        }

        settings.enabled = !wasEnabled;
    }

    return (
        <AddonCard
            name={getPluginName()}
            description={getPluginDescription()}
            isNew={isNew}
            enabled={isEnabled()}
            setEnabled={toggleEnabled}
            disabled={disabled}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            infoButton={
                <button
                    role="button"
                    onClick={() => openPluginModal(plugin, onRestartNeeded)}
                    className={classes(ButtonClasses.button, cl("info-button"))}
                >
                    {plugin.options && !isObjectEmpty(plugin.options)
                        ? <CogWheel className={cl("info-icon")} />
                        : <InfoIcon className={cl("info-icon")} />}
                </button>
            }
        />
    );
}

const enum SearchStatus {
    ALL,
    ENABLED,
    DISABLED,
    NEW
}

function ExcludedPluginsList({ search }: { search: string; }) {
    const matchingExcludedPlugins = Object.entries(ExcludedPlugins)
        .filter(([name]) => name.toLowerCase().includes(search));

    const ExcludedReasons: Record<"web" | "discordDesktop" | "vesktop" | "desktop" | "dev", string> = {
        desktop: "Discord Desktop app or Vesktop",
        discordDesktop: "Discord Desktop app",
        vesktop: "Vesktop app",
        web: "Vesktop app and the Web version of Discord",
        dev: "Developer version of Vencord"
    };

    return (
        <Text variant="text-md/normal" className={Margins.top16}>
            {matchingExcludedPlugins.length
                ? <>
                    <Forms.FormText>{i18n("SETTINGS.PLUGINS.LOOKING_FOR")}</Forms.FormText>
                    <ul>
                        {matchingExcludedPlugins.map(([name, reason]) => (
                            <li key={name}>
                                <b>{name}</b>: {i18n("SETTINGS.PLUGINS.ONLY_AVAILABLE_ON")} {ExcludedReasons[reason]}
                            </li>
                        ))}
                    </ul>
                </>
                : i18n("SETTINGS.PLUGINS.NO_SEARCH_RESULTS")
            }
        </Text>
    );
}

export default function PluginSettings() {
    const settings = useSettings();
    const changes = React.useMemo(() => new ChangeList<string>(), []);

    React.useEffect(() => {
        return () => void (changes.hasChanges && Alerts.show({
            title: i18n("SETTINGS.PLUGINS.RESTART_REQUIRED"),
            body: (
                <>
                    <p>{i18n("SETTINGS.PLUGINS.RESTART_REQUIRED_NOTE")}</p>
                    <div>{changes.map((s, i) => (
                        <>
                            {i > 0 && ", "}
                            {Parser.parse("`" + s + "`")}
                        </>
                    ))}</div>
                </>
            ),
            confirmText: i18n("SETTINGS.PLUGINS.RESTART_NOW"),
            cancelText: i18n("SETTINGS.PLUGINS.LATER"),
            onConfirm: () => location.reload()
        }));
    }, []);

    const depMap = React.useMemo(() => {
        const o = {} as Record<string, string[]>;
        for (const plugin in Plugins) {
            const deps = Plugins[plugin].dependencies;
            if (deps) {
                for (const dep of deps) {
                    o[dep] ??= [];
                    o[dep].push(plugin);
                }
            }
        }
        return o;
    }, []);

    const sortedPlugins = useMemo(() => Object.values(Plugins)
        .sort((a, b) => a.name.localeCompare(b.name)), []);

    const [searchValue, setSearchValue] = React.useState({ value: "", status: SearchStatus.ALL });

    const search = searchValue.value.toLowerCase();
    const onSearch = (query: string) => setSearchValue(prev => ({ ...prev, value: query }));
    const onStatusChange = (status: SearchStatus) => setSearchValue(prev => ({ ...prev, status }));

    const pluginFilter = (plugin: typeof Plugins[keyof typeof Plugins]) => {
        const { status } = searchValue;
        const enabled = Vencord.Plugins.isPluginEnabled(plugin.name);
        if (enabled && status === SearchStatus.DISABLED) return false;
        if (!enabled && status === SearchStatus.ENABLED) return false;
        if (status === SearchStatus.NEW && !newPlugins?.includes(plugin.name)) return false;
        if (!search.length) return true;

        // 檢查插件名稱和描述的翻譯
        const translationKey = `PLUGINS.${plugin.name}.description`;
        const translatedDesc = i18n(translationKey);
        const description = translatedDesc === translationKey ? plugin.description : translatedDesc;

        return (
            plugin.name.toLowerCase().includes(search) ||
            description.toLowerCase().includes(search) ||
            plugin.tags?.some(t => t.toLowerCase().includes(search))
        );
    };

    const [newPlugins] = useAwaiter(() => DataStore.get("Vencord_existingPlugins").then((cachedPlugins: Record<string, number> | undefined) => {
        const now = Date.now() / 1000;
        const existingTimestamps: Record<string, number> = {};
        const sortedPluginNames = Object.values(sortedPlugins).map(plugin => plugin.name);

        const newPlugins: string[] = [];
        for (const { name: p } of sortedPlugins) {
            const time = existingTimestamps[p] = cachedPlugins?.[p] ?? now;
            if ((time + 60 * 60 * 24 * 2) > now) {
                newPlugins.push(p);
            }
        }
        DataStore.set("Vencord_existingPlugins", existingTimestamps);

        return lodash.isEqual(newPlugins, sortedPluginNames) ? [] : newPlugins;
    }));

    const plugins = [] as JSX.Element[];
    const requiredPlugins = [] as JSX.Element[];

    const showApi = searchValue.value.includes("API");
    for (const p of sortedPlugins) {
        if (p.hidden || (!p.options && p.name.endsWith("API") && !showApi))
            continue;

        if (!pluginFilter(p)) continue;

        const isRequired = p.required || p.isDependency || depMap[p.name]?.some(d => settings.plugins[d].enabled);

        if (isRequired) {
            const tooltipText = p.required || !depMap[p.name]
                ? i18n("SETTINGS.PLUGINS.REQUIRED_FOR_FUNCTIONING")
                : makeDependencyList(depMap[p.name]?.filter(d => settings.plugins[d].enabled));

            requiredPlugins.push(
                <Tooltip text={tooltipText} key={p.name}>
                    {({ onMouseLeave, onMouseEnter }) => (
                        <PluginCard
                            onMouseLeave={onMouseLeave}
                            onMouseEnter={onMouseEnter}
                            onRestartNeeded={name => changes.handleChange(name)}
                            disabled={true}
                            plugin={p}
                            key={p.name}
                        />
                    )}
                </Tooltip>
            );
        } else {
            plugins.push(
                <PluginCard
                    onRestartNeeded={name => changes.handleChange(name)}
                    disabled={false}
                    plugin={p}
                    isNew={newPlugins?.includes(p.name)}
                    key={p.name}
                />
            );
        }
    }

    return (
        <SettingsTab title={i18n("SETTINGS.PLUGINS.TITLE")}>
            <ReloadRequiredCard required={changes.hasChanges} />

            <Forms.FormTitle tag="h5" className={classes(Margins.top20, Margins.bottom8)}>
                {i18n("SETTINGS.PLUGINS.FILTERS")}
            </Forms.FormTitle>

            <div className={classes(Margins.bottom20, cl("filter-controls"))}>
                <TextInput autoFocus value={searchValue.value} placeholder={i18n("SETTINGS.PLUGINS.SEARCH")} onChange={onSearch} />
                <div className={InputStyles.inputWrapper}>
                    <Select
                        options={[
                            { label: i18n("SETTINGS.PLUGINS.SHOW_ALL"), value: SearchStatus.ALL, default: true },
                            { label: i18n("SETTINGS.PLUGINS.SHOW_ENABLED"), value: SearchStatus.ENABLED },
                            { label: i18n("SETTINGS.PLUGINS.SHOW_DISABLED"), value: SearchStatus.DISABLED },
                            { label: i18n("SETTINGS.PLUGINS.SHOW_NEW"), value: SearchStatus.NEW }
                        ]}
                        serialize={String}
                        select={onStatusChange}
                        isSelected={v => v === searchValue.status}
                        closeOnSelect={true}
                        className={InputStyles.inputDefault}
                    />
                </div>
            </div>

            <Forms.FormTitle className={Margins.top20}>{i18n("SETTINGS.PLUGINS.TITLE")}</Forms.FormTitle>

            {plugins.length || requiredPlugins.length
                ? (
                    <div className={cl("grid")}>
                        {plugins.length
                            ? plugins
                            : <Text variant="text-md/normal">{i18n("SETTINGS.PLUGINS.NO_SEARCH_RESULTS")}</Text>
                        }
                    </div>
                )
                : <ExcludedPluginsList search={search} />
            }


            <Forms.FormDivider className={Margins.top20} />

            <Forms.FormTitle tag="h5" className={classes(Margins.top20, Margins.bottom8)}>
                {i18n("SETTINGS.PLUGINS.REQUIRED_PLUGINS")}
            </Forms.FormTitle>
            <div className={cl("grid")}>
                {requiredPlugins.length
                    ? requiredPlugins
                    : <Text variant="text-md/normal">{i18n("SETTINGS.PLUGINS.NO_SEARCH_RESULTS")}</Text>
                }
            </div>
        </SettingsTab >
    );
}

function makeDependencyList(deps: string[]) {
    return (
        <React.Fragment>
            <Forms.FormText>{i18n("SETTINGS.PLUGINS.REQUIRED_BY")}</Forms.FormText>
            {deps.map((dep: string) => <Forms.FormText key={dep} className={cl("dep-text")}>{dep}</Forms.FormText>)}
        </React.Fragment>
    );
}
