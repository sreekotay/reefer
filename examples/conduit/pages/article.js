
// ============================
// our article
// ============================
reefer.register('*article', {
  data: {
    datasrc: 'data.articledata.article',
    articledata: null,
    taglist: null
  },
  bind: {
    resource: { selector: '[reef=switcher]' } //  same as: reef-p-tag="~~[reef=switcher]"
  },
  observers: {
    articledata: function () {
      if (this.data.articledata) this.data.taglist = this.data.articledata.article.tagList
    },
    resource: function () {
      if (this.data.resource) {
        var url = baseurl + '/articles/' + this.data.resource
        this.bind('data.articledata', '$json:' + url)
      }
    }
  }
})

reeferHTML(function () { /**
<div class="article-page" reef=article>
  <reef-helper type=template(d)>
  <div>
  <div class="banner" >
    <div class="container">

      <h1>${d.title}</h1>

      <div class="article-meta">
        <a href=""><img src="${d.author.image}" /></a>
        <div class="info">
          <a href="" class="author">${d.author.username}</a>
          <span class="date">${new Date(d.createdAt).toLocaleString()}</span>
        </div>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow ${d.author.username} <span class="counter">(10)</span>
        </button>
        &nbsp;&nbsp;
        <button class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">(${d.favoritesCount})</span>
        </button>
      </div>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      ${d.body}
    </div>

    <hr />
      <div reef class="tag-list" reef-p-datasrc="data.taglist" reef-p-taglist="~~[reef=article]" >
        <reef-helper type='template(d)'>
          <a href='#?tag=\${d}'  class="tag-pill tag-default" >\${d}</a>
        </reef-helper>
      </div>

    <div class="article-actions">
      <div class="article-meta">
        <a href="profile.html"><img src="${d.author.image}" /></a>
        <div class="info">
          <a href="" class="author">${d.author.username}</a>
          <span class="date">January 20th</span>
        </div>

        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow Eric Simons <span class="counter">(10)</span>
        </button>
        &nbsp;
        <button class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">(${d.favoritesCount})</span>
        </button>
      </div>
    </div>
<!--
    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <form class="card comment-form">
          <div class="card-block">
            <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            <button class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>

        <div class="card">
          <div class="card-block">
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="" class="comment-author">Jacob Schmidt</a>
            <span class="date-posted">Dec 29th</span>
          </div>
        </div>

        <div class="card">
          <div class="card-block">
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer">
            <a href="" class="comment-author">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
            </a>
            &nbsp;
            <a href="" class="comment-author">Jacob Schmidt</a>
            <span class="date-posted">Dec 29th</span>
            <span class="mod-options">
              <i class="ion-edit"></i>
              <i class="ion-trash-a"></i>
            </span>
          </div>
        </div>

      </div>

    </div>
-->
  </div>
  </div>
  </reef-helper>
</div>
**/ })
