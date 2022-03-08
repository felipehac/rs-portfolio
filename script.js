const Fetcher = {
  async getRepos() {
    fetch("https://api.github.com/users/felipehac/repos")
      .then((res) => res.json())
      .then((data) =>
        DOM.renderProjects(
          data
            .filter((repo) => repo.fork == false && repo.description != null)
            .sort((repo1, repo2) =>
              repo1.created_at < repo2.created_at ? 1 : -1
            )
        )
      );
  },
};

const DOM = {
  projetsContainer: document.querySelector("#project-showcase"),
  renderProjects(projects) {
    console.log(projects);
    projects.forEach(this.addProject, DOM);
  },
  addProject(project) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = this.innerHTMLProject(project);
    this.projetsContainer.appendChild(div);
  },
  innerHTMLProject(project) {
    const html = `
      <a
      href="${project.html_url}"
      target="_blank">
      <div class="card project">
        <div class="card-content">
          <header>
            <img src="./assets/folder.svg" alt="Icon folder" />
            <h3>${project.name}</h3>
          </header>
          <p>
            ${project.description}
          </p>
          <footer>
            <div class="stats">
              <img src="./assets/star.svg" alt="Stars icon" />
              <span>${project.stargazers_count}</span>
              <img src="./assets/git-branch.svg" alt="Forks icon" />
              <span>${project.forks}</span>
            </div>
            <div class="language">
              <i class="circle stack-${project.language.toLowerCase()}"></i>
              <span>${project.language}</span>
            </div>
          </footer>
        </div>
      </div>
    </a>`;
    return html;
  },
};

const App = {
  init() {
    Fetcher.getRepos();
  },
};

App.init();
