import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";

import PageBase from "../lib/PageBase";
import Paper from "../lib/Paper";
import Txt from "../lib/Txt";

const Homepage = () => {
	const onClick = () => {
		toast.info("Hi!");
	};

	return (
		<PageBase>
			<Paper>
				<Button click={onClick} style={{ color: "#ff9999" }}>
					Notice!
				</Button>
			</Paper>
			<hr />

			<Txt variant="h1">Python Node</Txt>
			<br />
			<Txt>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
				at lacinia nisi, vitae pharetra elit. Quisque viverra augue eget
				neque laoreet, ut ultrices metus vulputate. Etiam egestas nisi
				in tincidunt malesuada. Vestibulum elit leo, gravida at nulla
				vel, ullamcorper elementum risus. Nullam efficitur, enim quis
				laoreet blandit, sem mauris placerat elit, a tincidunt arcu quam
				sit amet ligula. Nullam sed eros vel turpis fringilla imperdiet.
				Suspendisse potenti. Maecenas congue urna sit amet sem rutrum,
				vel mattis sem sagittis. In laoreet felis porttitor rutrum
				lacinia. Pellentesque pulvinar velit in neque feugiat, vitae
				commodo lacus lacinia. Praesent non est varius, blandit orci
				quis, aliquet enim. Vivamus vitae lectus faucibus, consectetur
				velit sed, sodales velit. Vivamus non sem varius, sollicitudin
				massa ac, molestie lacus. Nullam ante eros, malesuada nec
				consectetur nec, consequat eget tellus. Maecenas porttitor
				auctor urna quis aliquam. Donec vulputate aliquet dui, id
				pulvinar sapien aliquet eget.
			</Txt>
			<br />
			<Txt>
				Fusce blandit ipsum dui, ut gravida neque cursus et. Donec
				vulputate, felis eu tempor malesuada, urna felis blandit nunc,
				et faucibus magna dui ac libero. Nam sapien leo, venenatis eu
				erat non, porta vehicula magna. Etiam gravida justo et velit
				ultrices eleifend. Sed sed nisl pharetra, accumsan ante id,
				interdum quam. Vestibulum efficitur risus in erat bibendum, sed
				interdum metus posuere. Donec imperdiet libero sit amet blandit
				bibendum. Suspendisse blandit, felis in faucibus hendrerit,
				dolor tellus dignissim dui, in varius elit urna ac velit. Nunc
				ut sollicitudin lorem. Proin posuere mattis lobortis. Praesent
				vestibulum erat id tortor convallis placerat. Nam mi tortor,
				rhoncus id sagittis quis, molestie non turpis.
			</Txt>
		</PageBase>
	);
};

export default Homepage;
