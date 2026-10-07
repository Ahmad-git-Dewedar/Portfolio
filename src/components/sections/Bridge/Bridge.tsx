import styles from "./Bridge.module.css";

interface BridgeProps {
  text: string;
}

/**
 * The beat between Hero and About. With the 3D scene live, the statement is
 * drawn as depth-layered type inside the scene and this paragraph stays only
 * for assistive tech; otherwise it is shown here, fading in and out.
 */
export function Bridge({ text }: BridgeProps) {
  return (
    <div className={styles.bridge} data-scene="view">
      <p className={styles.statement}>{text}</p>
    </div>
  );
}
