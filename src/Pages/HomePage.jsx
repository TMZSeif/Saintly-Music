import { Link } from "react-router";

export default function HomePage() {
	return (
		<div className="container-fluid text-center home">
			<div className="container-fluid title">
				<h1>A Saint's Music Player</h1>
			</div>
			<div className="row">
				<Link className="col cynth border border-4 border-black link" to="/cynthia">
					<div>
						<h1>Cynthia</h1>
					</div>
				</Link>
				<Link className="col tmzseif border border-4 border-black link" to="/tmzseif">
					<div>
						<h1>TMZSeif</h1>
					</div>
				</Link>
			</div>
			<div className="row">
				<Link className="col sasha border border-4 border-black link" to="/sasha">
					<div>
						<h1>Sasha</h1>
					</div>
				</Link>
				<Link className="col veil border border-4 border-black link" to="/veil">
					<div>
						<h1>Veil</h1>
					</div>
				</Link>
			</div>
		</div>
	)
}