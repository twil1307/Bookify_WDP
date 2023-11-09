import AboutStyle from "./About.module.scss";

function About() {
  return (
    <>
      <h3 className={AboutStyle["about-title"]}>About</h3>
      <div className={AboutStyle["about-container"]}>
        <p>
          Iplorem sum de noquata helo mochisno dasino apetaca muchi nanoto ko
          iden saichou no hito plorem sum de noquata helo mochisno dasino
          apetaca muchi nanoto ko iden saichou no hito. Iplorem sum de noquata
          helo mochisno dasino apetaca muchi nanoto ko iden saichou no hito
        </p>
      </div>
    </>
  );
}

export default About;
