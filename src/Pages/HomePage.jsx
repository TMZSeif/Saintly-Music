import { Link } from "react-router";

export default function HomePage() {
	return (
		<div className="container-fluid text-center home">
			<div className="container-fluid title">
				<h1>A Saint's Music Player</h1>
			</div>
			<div className="row">
				<div onClick={() => window.location.assign("/cynthia")} className="col cynth border border-4 border-black">
					<Link className="link" to="/cynthia"><h1>Cynthia</h1></Link>
				</div>
				<div onClick={() => window.location.assign("/tmzseif")} className="col tmzseif border border-4 border-black">
					<Link className="link" to="/tmzseif"><h1>TMZSeif</h1></Link>
				</div>
			</div>
			<div className="row">
				<div onClick={() => window.location.assign("/sasha")} className="col sasha border border-4 border-black">
					<Link className="link" to="/sasha"><h1>Sasha</h1></Link>
				</div>
				<div onClick={() => window.location.assign("/veil")} className="col veil border border-4 border-black">
					<Link className="link" to="/veil"><h1>Veil</h1></Link>
				</div>
			</div>
		</div>
	)
}