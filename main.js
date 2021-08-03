const body = document.querySelector("#main");

async function makeApiRequest() {
	const rawData = await fetch(
		"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
	);
	const data = await rawData.json();

	for (let i = 0; i < data.length; i++) {
		await fetch(
			`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`
		).then(async function (data) {
			const newdata = await data.json();
			const parent = document.createElement("div");
			parent.className = "parent";
			parent.innerHTML = `
            <div class="card">
                <div class="card-body">    
                    <a class='parent1' href='${newdata.url}'target="_blank">${
				i + 1
			}.   ${newdata.title}
                    </a>
                </div>
            </div>              
                `;
			const child = document.createElement("div");
			child.className = "child";
			child.innerHTML = `
            <p>${newdata.score} points by ${newdata.by}</p>
            <p>total comments: ${newdata.descendants}</p>`;
			body.appendChild(parent);
			parent.appendChild(child);
		});
	}
}

makeApiRequest();
