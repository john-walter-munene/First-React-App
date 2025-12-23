import { PropTypes } from "prop-types";

const RenderName = (props) => {
    console.log(props.name);
    console.log(props.mustBePresent);

    return (
        <div>{props.name}</div>
    );
}

RenderName.propTypes = {
    name: PropTypes.string,
    mustBePresent: PropTypes.number.isRequired,
};

RenderName.defaultProps = {
  name: 'Zach',
};

function TypeCheckedApplication() {
    console.clear();
    return( 
        <>
            {<RenderName name={"Munene John"} mustBePresent={10} />} { /* Does well */ }
            {<RenderName name={new Array()} mustBePresent={new Object()} />} {/* Throws some errors, check the console*/ }
            {<RenderName mustBePresent={10} />}
        </>
    );
}

export { TypeCheckedApplication };