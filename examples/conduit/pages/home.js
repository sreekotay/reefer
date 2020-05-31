
// ============================
// our articles control
// ============================
reefer.register('*articlesList', {
  data: {
    datasrc: 'data.articlesdata.articles',
    articlesdata: null,
    tagsdata: null
  },
  bind: {
    tag: { selector: '[reef=switcher]' } //  same as: reef-p-tag="~~[reef=switcher]"
  },
  mutate: function (updates) {
    var url = baseurl + '/articles?'
    var tag = this.data.tag; if (tag) url += '&tag=' + tag
    this.bind('data.articlesdata', '$json:' + url)
  },
  observers: {
    'tagsdata': function (updates) {
      this.bind('data.tagsdata', '$json:' + baseurl + '/tags')
    }
  }
})

reeferHTML(function () { /**
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link disabled" href="">Your Feed</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="">Global Feed</a>
            </li>
          </ul>
        </div>
        <div reef=articlesList >
          <reef-helper type='function(d)' reef-slot='test'>
            if (d && d<3) console.log ('test')
          </reef-helper>
          <reef-helper type='template(d)'>
            <div class="article-preview">
              <div class="article-meta">
                <a href="profile.html"><img src="${d.author.image}" /></a>
                <div class="info">
                  <a href="" class="author">${d.author.username}</a>
                  <span class="date">${new Date(d.createdAt).toLocaleString()}</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> ${d.favoritesCount}
                </button>
              </div>
              <a href="#/article/${d.slug}" class="preview-link">
                <h1>${d.title}</h1>
                <p>${d.description}</p>
                <ul class="tag-list">
                  ${
                  (d.tagList && d.tagList.length ? '<li class="tag-default tag-pill tag-outline">' : '') +
                  (d.tagList||[]).join ('</li><li class="tag-default tag-pill tag-outline">') +
                  (d.tagList && d.tagList.length ? '</li>' : '')
                  }
                </ul>
                <span>Read more...</span>
              </a>
            </div>
          </div>
        </reef-helper>
      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div reef class="tag-list" reef-p-datasrc="data.tagsdata.tags" reef-p-tagsdata="~~[reef=articlesList]" >
            <reef-helper type='template(d)'>
              <a href='#?tag=${d}'  class="tag-pill tag-default" style='cursor:pointer' >${d}</a>
            </reef-helper>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
**/ })
