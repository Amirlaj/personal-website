import * as assert from "assert";
import { profile, projects, skills } from "../../app/portfolio-data";
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
    description: `<strong>${escapeHtml(profile.university)}</strong><br>${escapeHtml(profile.degree)}<br>${escapeHtml(profile.years)} · London, United Kingdom`,
    picture: artwork.city,
}, rootItem);

addItem({
    description: "Computer Science coursework: algorithms, Java, databases, systems architecture and operating systems.",
    picture: artwork.computer,
}, education);

const projectNode = addItem({
    description: "Projects from hackathons, independent learning and university coursework.",
    picture: artwork.projects,
}, rootItem);

projects.forEach((project, index) => {
    addItem({
        description: `<strong>${escapeHtml(project.title)}</strong><br>${escapeHtml(project.type)}<p>${escapeHtml(project.description)}</p>${project.tags.map(escapeHtml).join(" · ")}`,
        picture: [artwork.healthcare, artwork.ios, artwork.game][index] ?? artwork.projects,
    }, projectNode);
});

const skillNode = addItem({
    description: `My technical toolkit: ${skills.map(escapeHtml).join(", ")}.`,
    picture: artwork.skills,
}, rootItem);

for (const [label, picture] of [["Java", artwork.java], ["Swift", artwork.swift], ["Python", artwork.python], ["SQL", artwork.sql], ["JavaScript", artwork.javascript]]) {
    addItem({ picture, description: label === "JavaScript" ? "JavaScript · Node.js · Web development" : label }, skillNode);
}

const experience = addItem({
    picture: artwork.experience,
    description: "Experience in teaching, teamwork, project coordination and UI development.",
}, rootItem);

addItem({
    picture: artwork.tutoring,
    description: "<strong>Private Mathematics &amp; Physics Tutor</strong><br>London · Ongoing<p>Helping GCSE and A-Level students understand difficult concepts, build confidence and improve their problem-solving skills.</p>",
}, experience);

addItem({
    picture: artwork.hackathon,
    description: "<strong>Encode AI Hackathon</strong><br>Project Manager &amp; UI Developer<p>Worked with a small team to prototype an AI healthcare assistant, contributing to project coordination and the user interface.</p>",
}, experience);

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
