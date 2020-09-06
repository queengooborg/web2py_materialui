// Code based on https://codesandbox.io/s/20qpmo0v10
import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import submit from "./submit";

const renderError = ({ meta: { touched, error } }) =>
	touched && error ? <div className="error">{error}</div> : false;
const renderField = ({ input, label, type, meta: { touched, error } }) => (
	<div>
		<label>{label}</label>

		<input {...input} placeholder={label} type={type} />
		{touched && error && <div className="error">{error}</div>}
	</div>
);

renderError.propTypes = { meta: PropTypes.object };
renderField.propTypes = {
	input: PropTypes.object,
	label: PropTypes.element,
	meta: PropTypes.object,
	type: PropTypes.string,
};
const ValidableForm = (props) => {
	const { error, handleSubmit, pristine, reset, submitting } = props;
	return (
		<form onSubmit={handleSubmit(submit)}>
			<div>
				<label>First Name</label>
				<div>
					<Field
						component={renderField}
						name="firstName"
						placeholder="First Name"
						type="text"
					/>
				</div>
			</div>
			<div>
				<label>Last Name</label>
				<div>
					<Field
						component={renderField}
						name="lastName"
						placeholder="Last Name"
						type="text"
					/>
				</div>
			</div>
			<div>
				<label>Email</label>
				<div>
					<Field
						component={renderField}
						name="email"
						placeholder="Email"
						type="email"
					/>
				</div>
			</div>
			<div>
				<label>Sex</label>
				<div>
					<label>
						<Field
							component={renderField}
							name="sex"
							type="radio"
							value="male"
						/>{" "}
						Male
					</label>
					<label>
						<Field
							component={renderField}
							name="sex"
							type="radio"
							value="female"
						/>{" "}
						Female
					</label>
				</div>
			</div>
			<div>
				<label>Favorite Color</label>
				<div>
					<Field component="select" name="favoriteColor">
						<option />
						<option value="ff0000">Red</option>
						<option value="00ff00">Green</option>
						<option value="0000ff">Blue</option>
					</Field>
				</div>
			</div>
			<div>
				<label htmlFor="employed">Employed</label>
				<div>
					<Field
						component={renderField}
						id="employed"
						name="employed"
						type="checkbox"
					/>
				</div>
			</div>
			<div>
				<label>Notes</label>
				<div>
					<Field component="textarea" name="notes" />
				</div>
			</div>
			{error && (
				<div className="error">
					<strong>{error}</strong>
				</div>
			)}
			<div>
				<button disabled={pristine || submitting} type="submit">
					Submit
				</button>
				<button
					disabled={pristine || submitting}
					onClick={reset}
					type="button"
				>
					Clear Values
				</button>
			</div>
		</form>
	);
};
ValidableForm.propTypes = {
	error: PropTypes.string,
	handleSubmit: PropTypes.func,
	pristine: PropTypes.bool,
	reset: PropTypes.func,
	submitting: PropTypes.bool,
};
export default reduxForm({
	form: "simple", // a unique identifier for this form
})(ValidableForm);
