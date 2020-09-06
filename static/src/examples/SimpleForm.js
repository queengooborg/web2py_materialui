// Code based on https://codesandbox.io/s/mZRjw05yp
import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
const SimpleForm = (props) => {
	const { handleSubmit, pristine, reset, submitting } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>First Name</label>
				<div>
					<Field
						component="input"
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
						component="input"
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
						component="input"
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
							component="input"
							name="sex"
							type="radio"
							value="male"
						/>{" "}
						Male
					</label>
					<label>
						<Field
							component="input"
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
						component="input"
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
SimpleForm.propTypes = {
	handleSubmit: PropTypes.func,
	pristine: PropTypes.bool,
	reset: PropTypes.func,
	submitting: PropTypes.bool,
};
export default reduxForm({
	form: "simple", // a unique identifier for this form
})(SimpleForm);
