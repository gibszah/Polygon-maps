import axios from "axios";
import { useEffect, useState } from "react";

import { handleClicked } from "./UIElements/handleClick";

function Map() {
	const [zoneOne, setZoneOne] = useState([]);

	const token =
		"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJzYW5vQDEwNy5jby5qcCIsImRlcGFydG1lbnQiOiIiLCJuYW1lIjoiTm9yaXlhc3UgU2FubyIsImFkZCI6IiIsImxuZyI6MCwibGF0IjowLCJpYXQiOiIyMDIzLTAxLTEzVDE3OjIyOjQ4LjY0MTg5ODIzNloiLCJleHAiOiIyMDIzLTA3LTEyVDE3OjIyOjQ4LjY0MTg5ODIzNloiLCJpc3MiOiIxMDciLCJhdXQiOjN9.m09MKhzrnnCd-tosNJZyHVV12ErWOACExzdOfoeB6DuPc7s3QA6yagWIA8ZADWQgow9Wp0F6VHjfDdYpbh6C9iluLwb7rBmOPdsnzUi6vYKmCEx2ETeer0CjfEdUeu7yqcb-LmYXewOlwxhLR-GOUtD4VGok3bgc8nE-np8na50=";

	useEffect(() => {
		const fetchCoordinates = async () => {
			try {
				const response = await axios.post(
					process.env.REACT_APP_BACKEND_URL + "/trial",
					{
						lat: 35.72123671702373,
						lng: 139.7315125062222,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);
				// console.log(response.data.value.features[0].geometry.coordinates);
				const features = response.data.value.features;
				const coordsArray = [];

				for (let i = 0; i < features.length; i++) {
					const coords = features[i].geometry.coordinates[0][0].map((coord) => {
						return { lat: coord[1], lng: coord[0] };
					});
					coordsArray.push(coords);
				}

				console.log(coordsArray);

				setZoneOne(coordsArray);
			} catch (error) {
				console.log(error);
			}
		};

		fetchCoordinates();
	}, []);

	const handleClick = async () => {
		const map = new window.google.maps.Map(document.getElementById("map"), {
			zoom: 14,
			center: { lat: 35.72123671702373, lng: 139.7315125062222 },
			mapTypeId: "terrain",
		});

		const areas = [];

		zoneOne.forEach((zone) => {
			const area = new window.google.maps.Polygon({
				paths: zone,
				strokeColor: "#FF0000",
				strokeOpacity: 0.8,
				strokeWeight: 2,
				// fillColor: "#FF0000",
				fillOpacity: 0.35,
			});

			area.setMap(map);

			area.addListener("click", (event) => {
				handleClicked(area, event);
			});

			areas.push(area);
		});
	};

	return (
		<>
			<div className='container text-center pt-5'>
				<div className='row'>
					<div className='col align-self-center'>
						<button
							onClick={handleClick}
							type='button'
							className='btn btn-secondary'
							style={{ color: "white", fontWeight: "bold" }}
						>
							Click here to show your map!
						</button>
					</div>
				</div>
			</div>
			<br />
			<div
				id='map'
				style={{ height: "700px" }}
			></div>
		</>
	);
}

export default Map;
