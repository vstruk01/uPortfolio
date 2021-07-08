const Base64 = {
    decode: s => Uint8Array.from(atob(s), c => c.charCodeAt(0)),
    encode: b => btoa(String.fromCharCode(...new Uint8Array(b)))
};

async function loadWorks() {
    let resp = await fetch('https://api.github.com/repos/vstruk01/uPortfolio/contents/works.json', {
        method: 'GET'
    })
    // let resp = await fetch('http://127.0.0.1:5500/works.json', {
    //     method: 'GET'
    // })

    if (resp.ok) {
        let works = await resp.json();
        return JSON.parse(String.fromCharCode.apply(null, Base64.decode(works.content)));
        // return works;
    } else {
        console.log('error load works');
        return []
    }
}

async function loadAbout() {
    // let resp = await fetch('https://api.github.com/repos/vstruk01/uPortfolio/contents/about-lists.json', {
    //     method: 'GET'
    // })
    let resp = await fetch('http://127.0.0.1:5500/about-lists.json', {
        method: 'GET'
    })

    if (resp.ok) {
        let about = await resp.json();
        // return JSON.parse(String.fromCharCode.apply(null, Base64.decode(about.content)));
        return about;
    } else {
        console.log('error load works');
        return []
    }
}

async function renderWorks() {
    let work_html = document.getElementById('work');
    let works = await loadWorks();

    for (let work of works) {
        let obj = `<div class="cardProject">
                                    <span class="TitleCard">
                                        ${work.name}
                                    </span>
                                    <p>`;

        for (const team of work.team) {
            obj += `<a href="${team.github}" target="_blank">
                            <img src="${team.image}" alt="${team.name}">
                          </a>`;
        }

        obj += `</p>
          <p><strong>Description</strong>: ${work.description}</p>
          <p><strong>Time</strong>: ${work.time}</p>
          <p><strong>Technology</strong>:`;

        for (const teg of work.technology) {
            obj += `<span class="teg">${teg}</span>`
        }

        obj += `</p>
                      <p><strong>Skills</strong>: ${work.skills}</p>
                      <a class="linkCard" href="${work.github}" target="_blank">github</a>
                    </div>`;
        work_html.innerHTML += obj;
    }
}


async function renderAbout() {
    let about_h = document.getElementById('about');
    let abouts_list = await loadAbout();

    for (let list of abouts_list) {
        let obj = `<div class="about-list">
                    <p class="about-title">
                        ${list.nameColumn}
                    </p>
        <div>`

        for (let item of list.items) {
            obj += `<div class="about-item">${item}</div>`
        }
        obj += `</div></div>`
        about_h.innerHTML += obj
    }
}

renderAbout();
renderWorks();
