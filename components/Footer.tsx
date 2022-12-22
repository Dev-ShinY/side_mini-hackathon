import clsx from "clsx";
import "../styles/clsx-class.scss";

export default function Footer() {
  return (
    <div className={clsx(["w100", "pa-2", "flex", "footer"])}>
      버그 문의 : yshin.dev@gmail.com
    </div>
  );
}
