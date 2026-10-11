import java from "../../public/node-art/java.svg?raw";
import swift from "../../public/node-art/swift.svg?raw";
import python from "../../public/node-art/python.svg?raw";
import javascript from "../../public/node-art/javascript.svg?raw";
import linkedin from "../../public/node-art/linkedin.svg?raw";
import github from "../../public/node-art/github.svg?raw";

// Square, padded artwork stays inside the original renderer's circular masks.
function svgPicture(content: string) {
    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="white"/>${content}</svg>`)}`;
}

function brand(svg: string) {
    return svgPicture(svg.replace("<svg", '<svg x="42" y="42" width="116" height="116"'));
}

function icon(paths: string, color: string) {
    return svgPicture(`<g transform="translate(40 40) scale(5)" fill="none" stroke="${color}" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${paths}</g>`);
}

export const artwork = {
    resume: icon('<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z"/><path d="M14 3v5h5M9 12h6M9 16h6"/>', "#273c50"),
    city: "/node-art/city-logo.png",
    computer: icon('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="m9 7-3 3 3 3m6-6 3 3-3 3M8 21h8M12 17v4"/>', "#b51d36"),
    projects: icon('<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v1M3 7h17a1 1 0 0 1 1 1l-2 11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="m10 12-3 3 3 3m4-6 3 3-3 3"/>', "#315bb2"),
    healthcare: icon('<rect x="3" y="6" width="18" height="15" rx="3"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M12 10v7M8.5 13.5h7"/>', "#24856b"),
    ios: icon('<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4M11 19h2"/><rect x="9" y="9" width="2" height="2" rx=".4"/><rect x="13" y="9" width="2" height="2" rx=".4"/><rect x="9" y="13" width="2" height="2" rx=".4"/><rect x="13" y="13" width="2" height="2" rx=".4"/>', "#315bb2"),
    game: icon('<path d="M7 7h10c3 0 4 3 5 9 .5 3-1 5-3 3l-3-3H8l-3 3c-2 2-3.5 0-3-3 1-6 2-9 5-9Z"/><path d="M7 10v5M4.5 12.5h5"/><circle cx="16" cy="11" r=".6"/><circle cx="19" cy="14" r=".6"/>', "#315bb2"),
    skills: icon('<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>', "#305f49"),
    java: brand(java),
    swift: brand(swift),
    python: brand(python),
    sql: icon('<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>', "#296b87"),
    javascript: brand(javascript),
    experience: icon('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3M2 12c6 4 14 4 20 0M12 12v4"/>', "#69428b"),
    tutoring: icon('<path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15M5 8h4M5 12h4M15 8h4M15 12h4"/>', "#69428b"),
    hackathon: icon('<path d="m6 7-5 5 5 5m12-10 5 5-5 5M13 2 8 13h5l-2 9 6-12h-5Z"/>', "#69428b"),
    contact: icon('<path d="M21 11a8 8 0 0 1-8 8H8l-6 3 2-6a8 8 0 0 1-1-5 8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/><path d="M7 9h10M7 13h7"/>', "#086c9e"),
    email: icon('<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>', "#086c9e"),
    linkedin: brand(linkedin),
    github: brand(github),
};
