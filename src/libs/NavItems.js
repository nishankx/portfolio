import { FaCodeCommit } from "react-icons/fa6";
import { FaHubspot } from "react-icons/fa6";
import { FaConnectdevelop } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa6";

const navItems = [
    {
        title: "Projects",
        id: "projects",
        icon: FaCodeCommit,
    },
    {
        title: "Skills",
        id: "skills",
        icon: FaHubspot,
    },
    {
        title: "Connect",
        id: "about",
        icon: FaConnectdevelop,
    },
    {
        title: "Home",
        id: "landingWindow",
        icon: FaPenNib,
    },
    {
        title: "Blogs",
        id: "blogs",
        path: "/blogs",
        icon: FaBookOpen,
    },
];

export default navItems;