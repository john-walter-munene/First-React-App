import { useState } from "react";

// Lifting state up by example 
function Panel({ title, children}) {
    const [isActive, setIsActive] = useState(false);

    return (
        <section className="panel">
            <h3>{title}</h3>
            {isActive ? (<p>{children}</p>) : (<button onClick={() => setIsActive(true)}>Show</button>)}
        </section>
    );
}

function Accordion() {
    return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      <Panel title="About">
        With a population of about 2 million, Almaty is Kazakhstan's largest city. From 
            1929 to 1997, it was its capital city.
      </Panel>
      <Panel title="Etymology">
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" 
        and is often translated as "full of apples". In fact, the region surrounding Almaty is 
        thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is 
        considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

export { Panel, Accordion }

// But now let’s say you want to change it so that only one panel is expanded at any given time. 

// 1. Remove state from the child components.
// const [isActive, setIsActive] = useState(false);
// function Panel({ title, children, isActive }) {

// 2. Pass hardcoded data from the common parent.
function  UpdatedAccordion() {
   return (
    <>
        <h2>Almaty, Kazakhstan</h2>
        <UpdatedPanel title="About" isActive={true}>
            With a population of about 2 million, Almaty is Kazakhstan's largest city. 
            From 1929 to 1997, it was its capital city.
        </UpdatedPanel>
        <UpdatedPanel title="Etymology" isActive={true}>
            The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" and
            is often translated as "full of apples". In fact, the region surrounding Almaty is 
            thought to be the ancestral home of the apple, and the wild <i lang="la">Malus 
            sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
        </UpdatedPanel>
    </>
  );
}

function UpdatedPanel({ title, children, isActive }) {
    return (
        <section className="panel">
            <h3>{title}</h3>
            {isActive ? (<p>{children}</p>) : (<button onClick={() => setIsActive(true)}>Show</button>)}
        </section>
    );
}

export { UpdatedAccordion };

// 3. Add state to the common parent and pass it down together with the event handlers.
// const [activeIndex, setActiveIndex] = useState(0);
// passing an event handler down as a prop:
export function TestComponents () {
    return (
<>
  <Panel
    isActive={activeIndex === 0}
    onShow={() => setActiveIndex(0)}
  >
    ...
  </Panel>
  <Panel
    isActive={activeIndex === 1}
    onShow={() => setActiveIndex(1)}
  >
    ...
  </Panel>
</>
    );

}

// Fully fleshed solution.
function SuperAccrodion() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <h2>Almaty, Kazakhstan</h2>
            <SuperPanel title="About" isActive={activeIndex === 0} onShow={() => setActiveIndex(0)}>
                With a population of about 2 million, Almaty is Kazakhstan's largest city. From 1929 to 1997, it was its capital city.
            </SuperPanel>
            
            <SuperPanel title="Etymology" isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>
                The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for "apple" 
                and is often translated as "full of apples". In fact, the region 
                surrounding Almaty is thought to be the ancestral home of the apple, and the 
                wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor 
                of the modern domestic apple.
            </SuperPanel>
        </>
    );
}

function SuperPanel({title, children, isActive, onShow }) {
    return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (<p>{children}</p>) : (<button onClick={onShow}>Show</button>)}
    </section>
  );
}

export { SuperAccrodion };