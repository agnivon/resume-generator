import Accordion, { AccordionItem } from "./Accordion";

type AccordionListProps = {
  items: AccordionItem[];
};

export default function AccordionList(props: AccordionListProps) {
  const { items } = props;
  return (
    <div>
      {items.map((item, idx) => (
        <Accordion {...item} key={`${String(item.heading)}-${idx}`} />
      ))}
      {items.length === 1 && <div></div>}
    </div>
  );
}
