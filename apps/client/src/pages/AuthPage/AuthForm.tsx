import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { useAuthPage } from "./useAuthPage";
import styles from "./AuthForm.module.scss";

export function AuthForm() {
  const auth = useAuthPage();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>БЫСТРЫЙ ДОСТУП В СЕЗОН</span>
        <h1 className={styles.title}>{auth.mode === "login" ? "Вход в SDG" : "Регистрация в SDG"}</h1>
        <p className={styles.subtitle}>
          {auth.mode === "login"
            ? "Войди по никнейму и паролю. Если у тебя есть код лобби, игра сразу подключит тебя к нужному сезону."
            : "Создай локальный профиль, а затем сразу войди в нужное сезонное лобби по коду приглашения."}
        </p>
      </div>
      <div className={styles.modes}>
        <Button
          className={styles.modeButton}
          variant={auth.mode === "login" ? "primary" : "secondary"}
          onClick={() => auth.setMode("login")}
        >
          Вход
        </Button>
        <Button
          className={styles.modeButton}
          variant={auth.mode === "register" ? "primary" : "secondary"}
          onClick={() => auth.setMode("register")}
        >
          Регистрация
        </Button>
      </div>
      <div className={styles.fields}>
        <Input
          autoComplete="username"
          value={auth.loginValue}
          onChange={(event) => auth.setLoginValue(event.target.value)}
          placeholder="Никнейм"
        />
        <Input
          autoComplete={auth.mode === "login" ? "current-password" : "new-password"}
          value={auth.password}
          onChange={(event) => auth.setPassword(event.target.value)}
          placeholder="Пароль"
          type="password"
        />
        <Input
          autoCapitalize="characters"
          value={auth.lobbyCode}
          onChange={(event) => auth.setLobbyCode(event.target.value.toUpperCase())}
          placeholder="Код лобби"
        />
      </div>
      {auth.error && <p className={styles.error}>{auth.error}</p>}
      <Button className={styles.submit} disabled={auth.loading} onClick={() => void auth.submit()}>
        {auth.mode === "login" ? "Войти" : "Создать профиль и войти"}
      </Button>
      <p className={styles.footnote}>
        Никнейм и пароль хранятся локально на этом устройстве. Если код лобби указан, после входа профиль сразу
        подключается к нужному сезону.
      </p>
    </div>
  );
}
