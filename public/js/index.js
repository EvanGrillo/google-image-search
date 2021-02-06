window.addEventListener('load', (e) => {
      
    window.object = {
        images: []
    }

    document.querySelector('#refresh').addEventListener('click', (e) => {
        document.querySelector('#content-wrapper').style.display = 'block';
        document.querySelector('#search-icon').style.animationName = 'none';
        document.querySelector('#refresh').style.display = 'none';
        document.querySelector('#img-container').innerHTML = '';
    })

    document.querySelector('#search').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            run_search(e.target.value);

            document.querySelector('#search-icon').style.animationName = 'spin';

        }
    })

    function run_search(val) {
        
        var client = new XMLHttpRequest();
        client.open("GET", `/api/search/?search=${val}`);
        client.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        client.send(val);
        client.onreadystatechange = function() {

            if (client.readyState === 4) {

                var img_regex = /<img.*?src="(.*?)"[^>]+>/g;
                
                window.object.images = Array.from(client.response.match(img_regex));
                
                if (window.object.images.length > 30) {
                    window.object.images = window.object.images.slice(31, 50);
                } else {
                    window.object.images = window.object.images.slice(3);
                }

                window.object.images.forEach((img) => {
                    img = img.replace('data-src', 'src');
                    
                    img.match(/(class|data-lt|data-iml|jsname|data-deferred|data-atf)\=\"([A-Za-z0-9 _.]*)\"/gi).forEach((m) => {
                        img = img.replace(m, '');
                    });
                    // var whitelist = ["src","alt","width","height"];

                    var div = document.createElement('div');
                    div.innerHTML = img;
                    document.querySelector('#search').value = '';
                    document.querySelector('#img-container').append(div);
                    document.querySelector('#content-wrapper').style.display = 'none';
                    document.querySelector('#refresh').style.display = 'block';
                })
            }
        }
        

    }
    
});