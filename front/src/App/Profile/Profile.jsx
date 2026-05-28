import "./Profile.css";

export default function Profile() {
  return (
    <section className="profile-page" aria-labelledby="profile-title">
      <div className="profile-hero">
        <div className="profile-avatar" aria-hidden="true">LT</div>
        <div className="profile-heading">
          <p className="profile-kicker">Профіль</p>
          <h1 id="profile-title">Мій простір LumiTune</h1>
          <p>
            Тут буде інформація про користувача, його плейлісти,
            улюблені треки та персональні налаштування.
          </p>
        </div>
      </div>

      <div className="profile-grid">
        <article className="profile-panel">
          <span className="profile-panel__value">0</span>
          <span className="profile-panel__label">Плейлістів</span>
        </article>
        <article className="profile-panel">
          <span className="profile-panel__value">0</span>
          <span className="profile-panel__label">Улюблених треків</span>
        </article>
        <article className="profile-panel">
          <span className="profile-panel__value">0</span>
          <span className="profile-panel__label">Підписок</span>
        </article>
      </div>
    </section>
  );
}
