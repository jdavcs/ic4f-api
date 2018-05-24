**CHFA** is the **C**ollege of **H**umanities & **F**ine **A**rts at the University of Northern Iowa. 

This website with content management was my first non-trivial web application, written back in 2001. The CMS included multiple content types: facilities, equipment and software, departments, faculty and staff, news, training courses and registration. It used basic user authentication and authorization (admin users assigned one of the preset  access levels), uploaded files (with VBScript, no less!), sent out confirmation emails, and implemented CRUD operations for each entity. 

**System architecture:** CRUD operations for entities were implemented in separate files. Thus,
for each *foo* there was addFoo, editFoo, deleteFoo, viewAllFoos; and processAddFoo, processEditFoo, processDeleteFoo. Too many files, too much code. A lot of duplication.

**Security**. SQL statements built with <a href="https://xkcd.com/327" target="_blank">raw user input</a>, passwords stored as plain text; in an Access database...

...And still it survived for many years! And the best part, upon login, tech staff admins were greeted by characters from a Galaxy far, far away. I was greeted by Han.

<div class="screenshots row">
  <div class="col-6">
    <img class="img-fluid" src="/static/projects/uni_chfatech/1.png">
  </div>
  <div class="col-6">
    <img class="img-fluid" src="/static/projects/uni_chfatech/2.png">
  </div>
</div>

