import headerStyles from "@/styles/header.module.css"

export default function Header() {
  return (
    <>
    <div className={headerStyles.header}>
      <div className={headerStyles["bird-animation"]}>
        <div
          className={`${headerStyles["bird-container"]} ${headerStyles["bird-container-one"]}`}
        >
          <div
            className={`${headerStyles.bird} ${headerStyles["bird-one"]}`}
          />
        </div>

        <div
          className={`${headerStyles["bird-container"]} ${headerStyles["bird-container-two"]}`}
        >
          <div
            className={`${headerStyles.bird} ${headerStyles["bird-two"]}`}
          />
        </div>

        <div
          className={`${headerStyles["bird-container"]} ${headerStyles["bird-container-three"]}`}
        >
          <div
            className={`${headerStyles.bird} ${headerStyles["bird-three"]}`}
          />
        </div>

        <div
          className={`${headerStyles["bird-container"]} ${headerStyles["bird-container-four"]}`}
        >
          <div
            className={`${headerStyles.bird} ${headerStyles["bird-four"]}`}
          />
        </div>
      </div>

      <h1 className={headerStyles.title}>EYE SPY BIRD</h1>
      </div>
    </>
  )
}
