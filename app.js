import sublinks from "./data.js";
import get from "./getElement.js";

const openSidebarBtn = get(".toggle-btn");
const closeSidebarBtn = get(".close-btn");
const sidebarWrapper = get(".sidebar-wrapper");
const sidebar = get(".sidebar-links");
const linksBtn = [...document.querySelectorAll(".link-btn")];
const submenu = get(".submenu");
const hero = get(".hero");
const nav = get(".nav");

openSidebarBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});
closeSidebarBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});

sidebar.innerHTML = sublinks
  .map((sublink) => {
    const { page, links } = sublink;

    return `<article>
    <h4>${page}</h4>
    <div class='sidebar-sublinks'>
    ${links
      .map((link) => {
        return `<a href='${link.url}'>
        <i class='${link.icon}'></i>${link.label}
          </a>`;
      })
      .join("")}
    </div>
    </article>`;
  })
  .join("");

linksBtn.map((btn) => {
  btn.addEventListener("mouseover", (e) => {
    const text = e.currentTarget.textContent;
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const bottom = tempBtn.bottom - 3;
    const center = (tempBtn.right + tempBtn.left) / 2;

    const tempPage = sublinks.find((sublink) => sublink.page === text);
    if (tempPage) {
      const { links, page } = tempPage;
      submenu.style.top = `${bottom}px`;
      submenu.style.left = `${center}px`;
      submenu.classList.add("show");
      let column = "col-2";
      if (links.length === 3) {
        column = "col-3";
      }
      if (links.length > 3) {
        column = "col-4";
      }
      submenu.innerHTML = `
      <section>
      <h4>${page}</h4>
      <div class='submenu-center ${column}'>
      ${links
        .map((link) => {
          return `<a href='${link.url}'>
        <i class='${link.icon}'></i>${link.label}
          </a>`;
        })
        .join("")}
      </div>
      </section>
      `;
    }
  });
});

hero.addEventListener("mouseover", () => {
  submenu.classList.remove("show");
});
nav.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("link-btn")) {
    submenu.classList.remove("show");
  }
});
