document.getElementById("loadUsers").addEventListener("click", function () {
    let soapRequest =
        `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                       xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                       xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <GetUsers xmlns="http://example.com/" />
          </soap:Body>
        </soap:Envelope>`;

    fetch("https://localhost:44351/Service.asmx", {
        method: "POST",
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            "SOAPAction": "http://example.com/GetUsers"
        },
        body: soapRequest
    })
        .then(response => response.text())  // XML を取得
        .then(str => {
            console.log("レスポンスXML:", str); // XMLを確認

            // XML → JSON 変換
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(str, "text/xml");

            let users = [];
            let userNodes = xmlDoc.getElementsByTagName("User");

            for (let i = 0; i < userNodes.length; i++) {
                let user = {
                    Id: userNodes[i].getElementsByTagName("Id")[0].textContent,
                    Name: userNodes[i].getElementsByTagName("Name")[0].textContent,
                    Email: userNodes[i].getElementsByTagName("Email")[0].textContent
                };
                users.push(user);
            }

            // JSON に変換されたデータを使ってリスト表示
            let userList = document.getElementById("userList");
            userList.innerHTML = ""; // クリア

            users.forEach(user => {
                let li = document.createElement("li");
                li.textContent = `${user.Id}: ${user.Name} (${user.Email})`;
                userList.appendChild(li);
            });

            console.log("JSONデータ:", JSON.stringify(users, null, 2)); // JSON 確認
        })
        .catch(error => console.error("エラー:", error));
});
