import * as assert from "assert";
import { experience, profile, projects, skills } from "../content/portfolio";
import { artwork } from "./node-art";

type CVInfo = {
    picture: string,
    description?: string,
    relDistance?: number;
    relSize?: number;
}

export type CVItem = {
    picture: string,
    description?: string,
    depth: number
    relDistance: number;
    relSize: number;
}

export type Tree = {
    item: CVItem,
    children: Tree[]
}

// Node artwork is personal content, not part of the original renderer.
function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]!);
}

const rootItem: CVItem = {
    picture: "/amir-portrait.jpeg",
    description: `<strong>${escapeHtml(profile.name)}</strong><br>${escapeHtml(profile.role)}<br>${escapeHtml(profile.location)}`,
    depth: 0, relSize: 1, relDistance: 1,
};
const tree: Tree = {item: rootItem, children: []};

function findItem(item: CVInfo): Tree {
    function walkTree(tree: Tree): Tree | undefined {
        if(tree.item === item)
            return tree;
        for(const subTree of tree.children) {
            const res = walkTree(subTree);
            if(res !== undefined)
                return res;
        }
        return undefined;
    }
    return walkTree(tree) ?? assert.fail();
}

function addItem(info: CVInfo, parent: CVInfo): CVInfo {
    const parentTree = findItem(parent);
    const item: CVItem = {
        description: info.description,
        picture: info.picture,
        depth: parentTree.item.depth + 1,
        relDistance: info.relDistance ?? parentTree.item.relDistance * 0.6,
        relSize: info.relSize ?? parentTree.item.relSize * 0.65
    };
    parentTree.children.push({item: item, children: []});
    return item;
}

export function getTree() {
    return tree;
}

addItem({
    description: `You can download my résumé <a href="${escapeHtml(profile.resume)}" target="_blank" rel="noopener" download>here</a>.`,
    picture: artwork.resume,
}, rootItem);

const education = addItem({
    description: "Education in Computer Science, with a scholarship for my one-year A-level programme.",
    picture: artwork.education,
}, rootItem);

addItem({
    description: `<strong>${escapeHtml(profile.university)}</strong><br>${escapeHtml(profile.degree)}<br>${escapeHtml(profile.years)}<p>${escapeHtml(profile.academicProgress)}</p>`,
    picture: artwork.city,
}, education);

addItem({
    description: "<strong>Collingham College</strong><br>Aug 2023 – May 2024<p>One-year A-level programme; awarded a scholarship.</p>",
    picture: artwork.computer,
}, education);

const projectNode = addItem({
    description: "Recent projects in compilers, backend systems, iOS, networking and games. Explore a project for details and its repository.",
    picture: artwork.projects,
}, rootItem);

const projectPictures: Record<string, string> = {
    compiler: artwork.compiler,
    pharmacy: artwork.healthcare,
    crypto: artwork.ios,
    networks: artwork.networks,
    game: artwork.game,
};

projects.forEach((project) => {
    addItem({
        description: `<strong>${escapeHtml(project.title)}</strong><br>${escapeHtml(project.type)} · ${escapeHtml(project.dates)}<p>${escapeHtml(project.description)}</p>${project.tags.map(escapeHtml).join(" · ")}<p><a href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">View repository ↗</a></p>`,
        picture: projectPictures[project.id] ?? artwork.projects,
    }, projectNode);
});

const skillNode = addItem({
    description: `My technical toolkit: ${skills.map(escapeHtml).join(", ")}.`,
    picture: artwork.skills,
}, rootItem);

for (const [description, picture] of [
    ["Java · Spring Boot · REST APIs · JWT authentication · Role-based access control", artwork.java],
    ["Swift · SwiftUI · MVVM · Combine · Core Data · TestFlight", artwork.swift],
    ["SQL · Schema design · Entity–relationship modelling", artwork.sql],
    ["JavaScript · Node.js · Express · MongoDB", artwork.javascript],
    ["Testing and collaboration · JUnit · Mockito · Git · GitHub", artwork.testing],
]) {
    addItem({ picture, description }, skillNode);
}

const experienceNode = addItem({
    picture: artwork.experience,
    description: "Software engineering, hackathons, tutoring and open-source contributions.",
}, rootItem);

const experiencePictures: Record<string, string> = {
    internship: artwork.geometry,
    hackathon: artwork.hackathon,
    tutoring: artwork.tutoring,
};

experience.forEach((entry) => {
    addItem({
        picture: experiencePictures[entry.id] ?? artwork.experience,
        description: `<strong>${escapeHtml(entry.title)}</strong><br>${escapeHtml(entry.dates)} · ${escapeHtml(entry.location)}<p>${escapeHtml(entry.description)}</p>`,
    }, experienceNode);
});

addItem({
    picture: artwork.opensource,
    description: "<strong>Open-source contributions</strong><p>Contributed to cURL, the command-line tool and library for transferring data over URLs.</p>",
}, experienceNode);

const social = addItem({
    picture: artwork.contact,
    description: "Get in touch about internships, collaborative projects and opportunities.",
}, rootItem);

addItem({
    description: `<a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>`,
    picture: artwork.email,
}, social);

addItem({
    description: `<a href="${escapeHtml(profile.linkedin)}" target="_blank" rel="noopener noreferrer">Connect with me on LinkedIn</a>`,
    picture: artwork.linkedin,
}, social);

if (profile.github) {
    addItem({
        description: `<a href="${escapeHtml(profile.github)}" target="_blank" rel="noopener noreferrer">GitHub</a>`,
        picture: artwork.github,
    }, social);
}
