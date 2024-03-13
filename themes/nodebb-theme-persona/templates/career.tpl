<!-- IMPORT partials/breadcrumbs.tpl -->
<div data-widget-area="header">
    {{{each widgets.header}}}
    {{widgets.header.html}}
    {{{end}}}
</div>
<div class="row">
    <div class="<!-- IF widgets.sidebar.length -->col-lg-9 col-sm-12<!-- ELSE -->col-lg-12<!-- ENDIF widgets.sidebar.length -->">
        <h1 class="career-title">Career</h1>
        <p>
            Welcome to the careers page! This is a brand new feature added to allow 
            students to connect with various job recruiters.
        </p>
        This page is still under development.

        <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Upload File</title>
</head>
<body>
<h2>Upload a File</h2>
<form action="/api/file" method="post" enctype="multipart/form-data">
  <input type="file" name="filename">
  <input type="submit" value="Upload">
</form>
<iframe src="/static/undefined-1708808197954-807629659-James_Chen_resume.pdf" width='724' height='1024' allowfullscreen webkitallowfullscreen></iframe>
</body>
</html>

    </div>
    <div data-widget-area="sidebar" class="col-lg-3 col-sm-12 <!-- IF !widgets.sidebar.length -->hidden<!-- ENDIF !widgets.sidebar.length -->">
        {{{each widgets.sidebar}}}
        {{widgets.sidebar.html}}
        {{{end}}}
    </div>
</div>
<div data-widget-area="footer">
    {{{each widgets.footer}}}
    {{widgets.footer.html}}
    {{{end}}}
</div>
