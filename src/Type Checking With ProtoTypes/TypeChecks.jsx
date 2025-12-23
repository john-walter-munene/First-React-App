import PropTypes from "prop-types";

function PercentageStat({ label, score = 0, total = Math.max(1, score) }) {
  return (
    <div>
      <h1>{ label }</h1>
      <h3>{ Math.round(score / total * 100) }%</h3>
    </div>
  );
}

function TypeCheckedApplication () {
    return (
        <div>
            <h1>Male Population</h1>
            <div>
                <PercentageStat label="Class 1" total={360} score={203} />
                <PercentageStat label="Class 2" total={206} />
                <PercentageStat label="Class 3" score={107} />
                <PercentageStat label="Class 4" total={new Array()}/>
            </div>
        </div>
    );
}

export { TypeCheckedApplication };

// PropTypes.arrayOf
// PropTypes.arrayOf ensures that the prop is an array in which all items match the specified type:
function Component() { return null };

const Person = new Object(); // Dummy Object.

Component.propTypes = {

  peopleArrayProp: PropTypes.arrayOf(
    PropTypes.instanceOf(Person)
  ), multipleArrayProp: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]))};

// PropTypes.objectOf
function ComponentTwo() { return null };
ComponentTwo.propTypes = {

  booleanObjectProp: PropTypes.objectOf(
    PropTypes.bool
  ),

  multipleObjectProp: PropTypes.objectOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.number, PropTypes.string, PropTypes.instanceOf(Person)])),
};

// PropTypes.shape
function ComponentThree() { return null; };

ComponentThree.propTypes = {
  profileProp: PropTypes.shape({
    id: PropTypes.number,
    fullname: PropTypes.string,
    gender: PropTypes.oneOf(['M', 'F']),
    birthdate: PropTypes.instanceOf(Date),
    isAuthor: PropTypes.bool
  }),
};

// PropTypes.exact
function ComponentFour() { return null; };
ComponentFour.propTypes = {
    subjectScoreProp: PropTypes.exact({ subject: PropTypes.oneOf(['Maths', 'Arts', 'Science']), score: PropTypes.number }), };

// Required types
function ComponentFive() {};

ComponentFive.propTypes = {

  requiredAnyProp: PropTypes.any.isRequired,
  requiredFunctionProp: PropTypes.func.isRequired,
  requiredSingleElementProp: PropTypes.element.isRequired,
  requiredPersonProp: PropTypes.instanceOf(Person).isRequired,
  requiredEnumProp: PropTypes.oneOf(['Read', 'Write']).isRequired,

  requiredShapeObjectProp: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    isRecent: PropTypes.bool
  }).isRequired

};

// Custom validators for type checking React props
// Basic custom validators
function ComponentSix() {};

const isEmail = function(props, propName, componentName) {
  const regex = /^((([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,})))?$/;

  if (!regex.test(props[propName])) {
    return new Error(`Invalid prop `${propName}` passed to `${componentName}`. Expected a valid email address.`);
  }
}

ComponentSix.propTypes = {
  email: isEmail,
  fullname: PropTypes.string,
  date: PropTypes.instanceOf(Date)
};

// Validating PercentageStat in React

// Checks if a value is numeric
// Either a finite number or a numeric string
function isNumeric(value) {
  const regex = /^(\+|-)?((\d*\.?\d+)|(\d+\.?\d*))$/;
  return Number.isFinite(value) || ((typeof value === "string") && regex.test(value));
}


// Checks if value is non-zero
// Value is first converted to a number
function isNonZero(value) {
  return +value !== 0;
}


// Takes test functions as arguments and returns a custom validation function.
// Each function passed in as argument is expected to take a value argument
// expected to accept a value and return a Boolean if it passes the validation.
// All tests must pass for the custom validator to be marked as passed.
function validatedType(...validators) {
  return function(props, propName, componentName) {

    const value = props[propName];

    const valid = validators.every(validator => {
      if (typeof validator === "function") {
        const result = validator(value);
        return (typeof result === "boolean") && result;
      }

      return false;
    });

    if (!valid) {
      return new Error(`Invalid prop \`${propName}\` passed to \`${componentName}\`. Validation failed.`);
    }

  }
}

// Set the propTypes for the component
PercentageStat.propTypes = {
  label: PropTypes.string.isRequired,
  score: validatedType(isNumeric),
  total: validatedType(isNumeric, isNonZero)
}