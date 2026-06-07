import { PageContainer } from "../../components/layout/PageContainer/PageContainer";
import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { Panel } from "../../components/ui/Panel/Panel";
import { Toggle } from "../../components/ui/Toggle/Toggle";
import sharedStyles from "../shared.module.scss";
import { SettingsRange } from "./SettingsRange";
import { useSettingsPage } from "./useSettingsPage";

export function SettingsPage() {
  const settings = useSettingsPage();

  return (
    <PageContainer>
      <div className={sharedStyles.stack}>
        <h1>Настройки</h1>
        <Panel>
          <div className={sharedStyles.stack}>
            <SettingsRange label="Громкость музыки" value={settings.musicVolume} onChange={settings.setMusicVolume} />
            <SettingsRange label="Громкость эффектов" value={settings.effectsVolume} onChange={settings.setEffectsVolume} />
            <label>
              Качество анимаций
              <select value={settings.animationQuality} onChange={(event) => settings.setAnimationQuality(event.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <Toggle label="Тряска экрана" checked={settings.screenShake} onChange={settings.setScreenShake} />
            <Toggle label="Уменьшить анимации" checked={settings.reducedMotion} onChange={settings.setReducedMotion} />
          </div>
        </Panel>

        <Panel>
          <div className={sharedStyles.stack}>
            <h2>Режим прогресса</h2>
            <p>
              {settings.mode === "SEASON" && settings.activeSeason
                ? `Сейчас активен сезон "${settings.activeSeason.name}".`
                : "Сейчас используется локальный профиль устройства."}
            </p>
            {settings.mode === "SEASON" && (
              <Button variant="secondary" onClick={settings.setLocalMode}>
                Переключиться на локальный профиль
              </Button>
            )}
          </div>
        </Panel>

        <Panel>
          <div className={sharedStyles.stack}>
            <h2>Экспорт локального профиля</h2>
            <p>Сгенерируй нечитаемый код SDG, чтобы перенести прогресс на другое устройство.</p>
            <Button onClick={() => void settings.revealExportCode()}>Сгенерировать код экспорта</Button>
            {settings.exportCode && <textarea readOnly rows={8} value={settings.exportCode} />}
          </div>
        </Panel>

        <Panel>
          <div className={sharedStyles.stack}>
            <h2>Импорт локального профиля</h2>
            <Input
              value={settings.importCode}
              onChange={(event) => settings.setImportCode(event.target.value)}
              placeholder="Вставьте код профиля"
            />
            <Button variant="secondary" onClick={() => void settings.restoreLocalProfile()}>
              Импортировать профиль
            </Button>
          </div>
        </Panel>

        <Button variant="secondary" onClick={settings.logout}>
          Выйти из аккаунта
        </Button>
      </div>
    </PageContainer>
  );
}
