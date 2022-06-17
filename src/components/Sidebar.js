import Sidebaritem from "./Sidebaritem";
import items from "../data/sidebar.json"


export default function Sidebar(){
    return (
        <div className="sidebar">
            <div className="title">egeroglu</div>
            { items.map((item, index) => <Sidebaritem key={index} item={item} />) }
        </div>
    )
}