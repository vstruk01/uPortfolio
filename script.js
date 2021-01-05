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

renderWorks();
