<!DOCTYPE html>
<html lang="ru">
    <head>
      <meta charset="UTF-8">

<title>find.Dhamma.gift - Поисковый сайт Освобождения. Пали Сутты и Виная</title>

        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <!-- Favicon-->
		
	<meta property="og:locale" content="ru_RU" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="find.Dhamma.gift - Поисковая Система Освобождения" />
    <meta property="og:description" content="Находите информацию в Суттах и Винае на Пали, Русском, Английском и Тайском" />
    <meta property="og:url" content="https://find.dhamma.gift/" />
    <meta property="og:site_name" content="find.Dhamma.gift" />
    <meta property="og:image" itemprop="image" content="https://find.dhamma.gift/assets/social_sharing_gift_rus.jpg" />
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="Поисковая Система Освобобждения">
	<meta name="twitter:description" content="Находите информацию в Суттах и Винае на Пали, Русском, Английском и Тайском">
	<link rel="icon" type="image/png" href="/assets/favico-noglass.png" />
 
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  
        <!-- Font Awesome icons (free version)-->
        <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
        <!-- Google fonts-->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css" />
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic" rel="stylesheet" type="text/css" />
        <!-- Core theme CSS (includes Bootstrap)-->
		<link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
        <link href="/css/styles.css" rel="stylesheet" />
        <link href="/css/extrastyles.css" rel="stylesheet" />
  
<script src="/js/autopali.js"></script>
	 
	 	 <style>
	 </style>
	 
    </head>
      <body id="page-top"> 
	  
	  
    	<?php
		// Defining variables
$nameErr = $languageErr  = "";
$pattern = $language = $arg = "";
		// Checking for a POST request
		
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
      $nameErr = "Only letters and white space allowed";
    }
  }
	if (empty($_POST["language"])) {
    $languageErr = "language is required";
  } else {
    $language = test_input($_POST["language"]);
  }
}	
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$pattern = test_input($_POST["pattern"]);
/* 		$pitaka = test_input($_POST["pitaka"]);
 */		}
		// Removing the redundant HTML characters if any exist.
		function test_input($data) {
		$data = trim($data);
	/*	$data = stripslashes($data);
		$data = htmlspecialchars($data); */
		return $data;
		}
		
      if (empty($_POST["language"])) {
    $languageErr = "";
  } else {
    $language = test_input($_POST["language"]);
  }
		?>
 
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg bg-secondary text-uppercase" id="mainNav">
            <a class="navbar-brand mobile-center" href="/ru.php"> <div class="container"><img src="./assets/dhammafindlogo.png"  style="width:100px;"></a>
                <a class="navbar-brand mobile-none" href="/ru.php">find.dhamma.gift</a>
                <button class="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Меню
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
      <!-- <li class="nav-item mx-0 mx-lg-1"><a class="nav-link py-3 px-0 px-lg-3 rounded" href="/">Main</a></li> 
	  nav-link -->
	  
	  
<li class="nav-item mb-3 mx-lg-2"><a class="nav-link px-0 px-lg-0 rounded" href="https://find.dhamma.gift/sc/">SC Лайт</a></li>
<li class="nav-item mb-3 mx-lg-2"><a class="nav-link px-0 px-lg-0 rounded" href="/list.php?lang=pali">История Поиска</a></li>
<li class="nav-item mb-3 mx-lg-2"><a class="nav-link px-0 px-lg-0 rounded" href="#help">Помощь</a></li>
<li class="nav-item mb-3 mx-lg-2"><a class="nav-link py-3 px-0 px-lg-0 rounded" href="#project">О Нас</a></li>             
<li class="nav-item mb-3 mx-lg-2"><a class="nav-link py-3 px-0 px-lg-0 rounded" href="#links">Полезное</a></li>
<li class="nav-item mb-3 mx-lg-2"><a class="nav-link py-3 px-0 px-lg-0 rounded" href="#contacts">Контакты</a></li>
<li class="nav-item mb-0 mx-lg-2"><p><a class="py-3 px-0 px-lg-1 rounded link-light text-decoration-none" href="/">En</a> 
		<a class="py-3 px-0 px-lg-1 rounded link-light" href="/ru.php">Ru</a></p></li>	
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Masthead-->
        <header class="masthead bg-primary text-white text-center">
            <div class="container d-flex align-items-center flex-column mb-4">
                        
                <!-- Masthead Avatar Image-->
            <!--    <img class="masthead-avatar mb-5" src="assets/img/avataaars.svg" alt="..." />-->
                <!-- Masthead Heading-->
                <h1 class="masthead-heading">Найдите Истину</h1>
                <!-- <h5 class="mr=5">Pāḷi, Русский, ไทย и English</h5> -->
				
                <!-- Icon Divider-->
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon">
                  
                      <i class="fa-solid fa-dharmachakra"></i>
                      </div>
                    <div class="divider-custom-line"></div>
                </div>
    
			<form method="post" action=
			"<?php echo htmlspecialchars($_SERVER[" PHP_SELF "]);?>"	action="" class="justify-content-center">  

  	<div class="mb-3 form-group input-group ui-widget">
		<label class="sr-only" for="paliauto">Что искать?</label>
			
			 <input name="pattern"  type="text" class="form-control roundedborder" id="paliauto" placeholder="прим. Kāyagat" autofocus>
	
			<div class="input-group-append"><button type="submit" name="submit" value="Search"  class="btn btn-primary mainbutton"><i class="fas fa-search"></i></button></div>
		</div>
  <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="language" <?php if (isset($language) && $language=="-pli") echo "checked";?> value="-pli">Pāḷi
  </div>
  <div class="form-check form-check-inline">
  <input class="form-check-input"  type="radio" name="language" <?php if (isset($language) && $language=="-ru ") echo "checked";?> value="-ru">Рус
  </div>
    <div class="form-check form-check-inline">
  <input class="form-check-input"  type="radio" name="language" <?php if (isset($language) && $language=="-th ") echo "checked";?> value="-th">ไทย
  </div>
  <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="language" <?php if (isset($language) && $language=="English") echo "checked";?> value="-en">Eng
  </div>
  <span class="error"><?php echo $languageErr;?></span>
				</form>
				
				<?php
$arg = $language . ' ' . $pattern;
?>
 </div>
<div>	
	<?php
 			echo $lang;
			$old_path = getcwd();
			$string = str_replace ("`", "", $pattern);
			$output = shell_exec("nice -19 ./scripts/finddhamma.sh -oru $language $string"); 
			echo "<p>$output</p>";
		?>	
</div>		
		

<!-- <a href="./list.php" class="btn btn-primary" role="button">История Поиска</a> -->


                <!-- Masthead Subheading
                <p class="masthead-subheading font-weight-light mb-0"><a href='list.php' style="color:blue;">All Searches</a></p>
                -->
            </div>
        </header>
        <!-- Portfolio Section-->
        <section class="page-section portfolio" id="help">
            <div class="container">
              	<p class="text-center">
	<a href="./list.php" class="btn btn-primary" role="button btn-lg">История Поиска</a>
	</p>
      <!-- <div class="divider-custom-icon text-center">
              <i class="fa-solid fa-book fa-4x" title="Exchange"></i> <i class="fa-solid fa-list fa-4x"></i>
              </div> -->
        <div class="font-italic"> 
	
	<h4 class="page-section-heading text-center mb-4">Как пользоваться?</h4>
	        <div class="embed-container mb-5 text-center"> 
                                   <iframe src="https://www.youtube.com/embed/iKRaa9D07-I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							                    		</div>

        <p class="lead mb-5 text-center">
		Всесторонний взгляд на значения, определения,<br> метафоры, персоналии, места и любые другие детали<br>
        из Палийских Сутт и Винаи в удобных таблицах<br> для дальнейшего изучения.

                        </p>
                                                </div> 
                                                
                      <h2 class="page-section-heading text-center text-uppercase text-secondary mb-3">Примеры</h2> 
<div class="mb-5">
              <ol class="col-lg-8 col-md-10 ms-auto">
                <!-- <li>Вся <a href="./list.php">история поиска</a></li> -->
                <li>Все сутты о <a href="https://find.dhamma.gift/assets/demo/%D0%B2%D0%BE%D1%81%D1%8C%D0%BC%D0%B5%D1%80%D0%B8%D1%87%D0%BD_sutta_ru.html">Восьмеричном</a> Пути на Русском</li>
                <li>Все сутты со словом <a href="https://find.dhamma.gift/assets/demo/%D0%BD%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D1%8C_sutta_ru.html">нравственность</a> на Русском</li>
                <li>Все сутты, где упомянут <a href="https://find.dhamma.gift/assets/demo/%D1%81%D0%B0%D1%80%D0%B8%D0%BF%D1%83%D1%82%D1%82_sutta_ru.html">Сарипутта</a> на Русском</li>
               <li>Все варианты словосочетания <a href="https://find.dhamma.gift/assets/demo/pa%E1%B9%ADiccasamupp_sutta_pali_words.html">paṭiccasamuppado</a> на Пали со ссылками на Русские переводы</li>
               <li>Все сутты где, упоминается об <a href="https://find.dhamma.gift/assets/demo/%D0%BE%D0%BA%D0%B5%D0%B0%D0%BD_sutta_ru.html">океане</a> на Русском</li>
               <li>Все сутты с <a href=./assets/demo/seyyathāpi_adhivacan_ūpama_opama_suttanta_pali.html>метафорами, примерами и сравнениями</a> на Пали со ссылками на Русские переводы</li>   
              </ol>    
</div>
         
                <!-- Portfolio Section Heading-->
                <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Как Искать?</h2>
                <!-- Icon Divider-->
                <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fa-solid fa-dharmachakra"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <!-- Portfolio Grid Items-->
                <div class="row justify-content-center">
                  
                            <h4 class="page-section-heading text-center mb-4">Подробное Видео</h4>
                    <div class="col-md-6 col-lg-4 mb-0">
                        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="assets/img/portfolio/awakening.jpg" alt="..." />
							
                        </div>
		<!-- text here --> <p class="mb-4">
		</p>
				
                    </div>             
								 
            
			<h4 class="page-section-heading text-center mb-4">Основы</h4>
                    <div class="col-md-6 col-lg-4 mb-0">
                        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal5">
                            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="assets/img/portfolio/dhammawheelgreen.jpg" alt="..." />
							
                        </div>
			
				                    		<!-- text here --> <p class="mb-4">
		</p>

				
                    </div>

<h4 class="page-section-heading text-center mb-4">для Продвинутых</h4>
                    <div class="col-md-6 col-lg-4 mb-0">
                        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal4">
                            <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                            </div>
                            <img class="img-fluid" src="assets/img/portfolio/sangha.jpg" alt="..." />
							
                        </div>
			
				                    		<!-- text here --> <p class="mb-4">
		</p>

				
                    </div>


                </div>
            </div>
        </section>
        <!-- About Section-->
        <section class="page-section bg-primary text-white mb-0" id="project">
            <div class="container">
                <!-- About Section Heading-->
                <h2 class="page-section-heading text-center text-uppercase text-white">О Проекте</h2>
                <!-- Icon Divider-->
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fa-solid fa-dharmachakra"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <!-- About Section Content-->
                <div class="row">
				
                    <div class="col-lg-4 ms-auto"><p class="lead">Find.Dhamma.Gift это поисковая система Освобождения, инструмент для поиска основанный на материалах SuttaCentral.net и Theravada.ru. Вы можете искать понятия, определения, метафоры, объяснения, людей, места и другое описанное в Суттах и Винае на Пали, Русском, Тайском и Английском.
                    </p></div>
                    <div class="col-lg-4 me-auto"><p class="lead">Дхамма энтузиасты, разработчики горячо приветствуются, у проекта большой потенциал в поисках настоящего значения текстов. Но, я не разработчик и это всего лишь скрипт на Bash и PHP-обёртка😊</p></div>
                    
                </div>
                <!-- About Section Button-->
                <div class="text-center mt-4">
                    <a class="btn btn-xl btn-outline-light" target="_blank" href="https://github.com/o28o/find-dhamma">
                
                   <i class="fa-brands fa-github"></i>     Проект на GitHub
                    </a>
                </div>
            </div>
        </section>
  
        <!-- Footer-->
        <footer id="links" class="footer text-center ">
               <h2 class="page-section-heading text-center text-uppercase text-white mb-5">Полезные Ссылки</h2>
			   
            <div class="container">
                <div  class="row">
                   <!-- Footer Location-->
                    <div class="col-lg-4 mb-5 mb-lg-0">
          

                        <h4 class="text-uppercase mb-4">Исследование</h4>
               
                <div class="list-group">

  <a href="#page-top" class="list-group-item list-group-item-action active">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">find.dhamma.gift</h5>
      <small class="text-muted">онлайн</small>
    </div>
    <p class="mb-1">Всепроникающий поиск на Сутты и Винаю.</p>
    <small class="text-muted"></small>
  </a>
        <a target="_blank" href="https://digitalpalidictionary.github.io/" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Digital Pali Dictionary</h5>
      <small class="text-muted">приложение</small>
    </div>
    <p class="mb-1">Крупнейший и самый быстры словарь и грамматика Пали.</p>
    <small class="text-muted">Доступно для ПК, Mac, Android, IOS</small>
  </a>


    <a target="_blank" href="https://www.wisdomlib.org/" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Wisdomlib.org</h5>
      <small class="text-muted">онлайн</small>
    </div>
    <p class="mb-1">Прекрасная онлайн коллекция словарей. Помимо Пали -  многие духовные традиции Индии</p>
    <small class="text-muted">Очень полезно для сложных понятий.</small>
  </a>
  
      <a target="_blank" href="http://dictionary.tamilcube.com/pali-dictionary.aspx" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">TamilCube.com</h5>
      <small class="text-muted">онлайн</small>
    </div>
    <p class="mb-1">Простой Англо-Палийский словарь</p>
    <small class="text-muted"></small>
  </a>

</div>  



                  
                        <p class="lead mb-0"> 
      
	  


                        </p>
                    </div>
                    <!-- Footer Social Icons-->
                    <div class="col-lg-4 mb-5 mb-lg-0">
                        <h4 class="text-uppercase mb-4">Чтение</h4>
                       
 <div class="list-group">


  <a target="_blank" href="https://Suttacentral.net" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between text-left">
      <h5 class="mb-1">Suttacentral.net</h5>
      <small>онлайн и оффлайн</small>
    </div>
    <p class="mb-1 text-left">Самая полная коллекция построчных переводов Типитаки Пали-Англ.</p>
    <small>Пали-Англ словарь можно включить в настройках</small>
  </a>
  
    <a target="_blank"   href="https://www.digitalpalireader.online/" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Digital Pali Reader</h5>
      <small class="text-muted">онлайн и оффлайн</small>
    </div>
    <p class="mb-1">Мощный инструмент для исследования Сутт и изучения Пали.</p>
    <small class="text-muted">Встроенный Пали-Англ словарь</small>
  </a>
  
  <a target="_blank"  href="https://tipitaka.theravada.su/toc/translations/1097" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Tipitaka.Theravada.su</h5>
      <small class="text-muted">онлайн</small>
    </div>
    <p class="mb-1">Много вариантов переводов. Построчно Пали-Англ-Русский.</p>
    <small class="text-muted">Особенно рекомендован для изучения текстов Дигха Никаи</small>
  </a>
  
  <a href="https://www.theravada.ru/" target="_blank"   class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Theravada.ru </h5>
      <small class="text-muted">онлайн</small>
    </div>
    <p class="mb-1">Самая полная коллекция Русских переводов Суттанты.</p>
    <small class="text-muted"></small>
  </a>
</div>  		


                        
	
                    </div>
					
					 <div class="col-lg-4 mb-5 mb-lg-0">
					<h4 class="text-uppercase mb-4">Изучение</h4>
	
	<div class="list-group">


  <a target="_blank" href="https://drive.google.com/file/d/1H_mhKNgrBYevOOnax-FUBgxkfSuwHItu/view?usp=sharing" class="list-group-item list-group-item-action active" aria-current="true">
    <div class="d-flex w-100 justify-content-between text-left ">
      <h5 class="mb-1">Новый Курс по Чтению Пали</h5>
      <small>учебник</small>
    </div>
    <p class="mb-1 text-left">Рекомендуемый Учебник</p>
    <small></small>
  </a>

    <a target="_blank"   href="https://drive.google.com/file/d/1HVRK6yTMT59uHCCvTdQukRy7fmHNntOr/view?usp=sharing" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Окончания Падежей в Пали</h5>
      <small class="text-muted">таблица</small>
    </div>
    <p class="mb-1">В англ. переводах и соответственно русских переводах с англ. языка падежи часто переведены неправильно.</p>
    <small class="text-muted">Обязательно сверяйте с Пали</small>
  </a>

  <a target="_blank" href="https://drive.google.com/file/d/1HzPCYsVBEkWErAk6TqSWRYKseM1hqMCb/view?usp=sharing" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between text-left">
      <h5 class="mb-1">Спряжения Палийских глаголов</h5>
      <small>таблица</small>
    </div>
    <p class="mb-1 text-left">Спряжения неправильно переведены реже чем падежи, но все же встречаются</p>
    <small>Обязательно сверяйте с Пали</small>
  </a>
  
  
  <a target="_blank"  href="
  https://drive.google.com/drive/u/1/folders/1UU-y5idRNpfcVTripRUtyTVcOgdwjMGN" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">Учебные материалы на русском и агнлийском</h5>
      <small class="text-muted">оффлайн</small>
    </div>
    <p class="mb-1">Подборка учебников и таблиц</p>
    <small class="text-muted"></small>
  </a>
  
</div>  
</div>
				</div>	
                    <!-- Footer About Text-->
                    <div id="contacts" class="col-lg-0 text-center">
                        <h4 class="text-uppercase mt-5 mb-4">Контакты</h4>
						
                        <p class="lead mb-4">
                            Найдите Благородный Восьмеричный Путь.<br>
							Поймите Четыре Благородные Истины.<br>
							Дхамма - это Действительность.
                      
                        </p>
							   <a  target="_blank"  class="btn btn-outline-light btn-social mx-1" href="https://github.com/o28o/find-dhamma#readme"><i class="fa-brands fa-github"></i></a>
                        <a  target="_blank"  class="btn btn-outline-light btn-social mx-1" href="mailto:o@dhamma.gift"><i class="fa-solid fa-at"></i></a>
			
						<a href="https://m.youtube.com/channel/UCoyL5T0wMubqrj4OnKVOlMw" class="btn btn-outline-light btn-social mx-1" title="YouTube" target="_blank" rel="nofollow"><i class="fa-brands fa-youtube"></i></a>
                    </div>
                
            </div>
        </footer>
        <!-- Copyright Section-->
        <div class="copyright py-4 text-center text-white">
            <div class="container"><small>Copyright &copy; Dhamma.gift 2022</small></div>
        </div>
        <!-- Portfolio Modals-->

	 
	  
        <!-- Portfolio Modal 1-->
        <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" aria-labelledby="portfolioModal4" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div class="modal-body text-center pb-5">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <!-- Portfolio Modal - Title-->
                                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Подробное Видео</h2>
                                    <!-- Icon Divider-->
                                    <div class="divider-custom">
                                        <div class="divider-custom-line"></div>
                                        <div class="divider-custom-icon"><i class="fa-solid fa-dharmachakra"></i></div>
                                        <div class="divider-custom-line"></div>
                                    </div>
                                    <!-- Portfolio Modal - Image
                                    <img class="img-fluid rounded mb-5" src="assets/img/portfolio/sangha.jpg" alt="..." /> -->
                                    <!-- Portfolio Modal - Text-->
                                       <div class="embed-container"> 
                                   <iframe src="https://www.youtube.com/embed/iKRaa9D07-I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
							                    		</div>
							   
                                    <button class="btn btn-primary" data-bs-dismiss="modal">
                                        <i class="fas fa-xmark fa-fw"></i>
                                        Закрыть Окно
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	 
	 
        <!-- Portfolio Modal 4-->
        <div class="portfolio-modal modal fade" id="portfolioModal4" tabindex="-1" aria-labelledby="portfolioModal4" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div class="modal-body text-center pb-5">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <!-- Portfolio Modal - Title-->
                                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">для Продвинутых</h2>
                                    <!-- Icon Divider-->
                                    <div class="divider-custom">
                                        <div class="divider-custom-line"></div>
                                        <div class="divider-custom-icon"><i class="fa-solid fa-dharmachakra"></i></div>
                                        <div class="divider-custom-line"></div>
                                    </div>
                                    <!-- Portfolio Modal - Image
                                    <img class="img-fluid rounded mb-5" src="assets/img/portfolio/sangha.jpg" alt="..." /> -->
                                    <!-- Portfolio Modal - Text-->
                                    <p class="mb-4">	
									<strong>Совет #1</strong><br>
								   Если вы хотите найти определенное слово в определенной сутте, самьютте, никае - запустите поиск в таком виде: Sn17.*seyyathāpi
								  <br>Запрос из примера выведет в таблицы все метафоры и сравнения из Sn17.<br><br>
								  <strong>Совет #2</strong><br>
								   Чтобы добавить вариации используйте [], к примеру запрос nand[iī] выведет в таблицы совпадения по обоим вариантам nandi и nandī.
								 <br><br>
						
									<strong>Совет #3</strong><br>
								   Если вы хотите найти слова начинающиеся или заканчивающиеся с определенного шаблона, используйте \\b в начале и\или в конце шаблона поиска, к примеру<strong>\\bkummo\\b</strong> выведет в таблицы только kummo и пропустит kummova и любые другие совпадения<br><br>
								   	<strong>Совет #4</strong><br>
								   Чтобы исключить один шаблон из результатов другого шаблона используйте аргумент -exc.<br>
								   Пример: dundubh -exc devadundubh - этот запрос позволит вам выгрузить совпадения по словам похожим на dundubh, но без devadundubh<br><br>
									<strong>Совет #5</strong><br>
								   Вы можете использовать регулярные выражения (regex) синтаксиса GNU grep -E. С использованием escape-последовательности (\\) они должны работать.<br><br>
								   	<strong>Совет #6 Подборки</strong><br>
								   Вы можете создавать подборки текстов. <br>
								   Примеры запросов:<br> 
								   "sn42.8|sn20.5" (включая кавычки) выведет в одну таблицу две Сутты полностью<br>
								   "Sn20.1" (включая кавычки) выведет Sn20.1 sn20.10 sn20.11 и тд в один файл<br>
								   "Sn20.1\\b" (включая кавычки) выведет только одну Сутту
								   <br><br>
								</p>
								
                                    <button class="btn btn-primary" data-bs-dismiss="modal">
                                        <i class="fas fa-xmark fa-fw"></i>
                                        Закрыть Окно
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Portfolio Modal 5-->
        <div class="portfolio-modal modal fade" id="portfolioModal5" tabindex="-1" aria-labelledby="portfolioModal5" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header border-0"><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div class="modal-body text-center pb-5">
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-8">
                                    <!-- Portfolio Modal - Title-->
                                    <h2 class="portfolio-modal-title text-secondary text-uppercase mb-0">Основы</h2>
                                    <!-- Icon Divider-->
                                    <div class="divider-custom">
                                        <div class="divider-custom-line"></div>
                                        <div class="divider-custom-icon"><i class="fa-solid fa-dharmachakra"></i></div>
                                        <div class="divider-custom-line"></div>
                                    </div>
                                    <!-- Portfolio Modal - Image
                                    <img class="img-fluid rounded mb-5" src="assets/img/portfolio/dhammawheel.jpg" alt="..." /> -->
                                    <!-- Portfolio Modal - Text-->

                                     <p class="mb-4"><strong>Совет #0</strong><br>
										Поиск производится на Пали, Русском, Английском и Тайском в материалах SuttaCentral.net и Theravada.ru, то есть если того или иного перевода нет на этих ресурсах здесь их также не будет.<br><br>
									 <strong>Совет #1</strong><br>
                                    Используйте специальные символы ā ī ū ḍ ṁ ṁ ṇ ṅ ñ ṭ<br><br>
                                     <strong>Совет #2 Кхуддака Никая</strong><br>
									 Поиск делается во всех суттах ДН, МН, СН, АН.
									 Крайне рекомендуется сначала разобраться с терминами и понятиями, так как они изложены в этих четырех сборниках текстов. И только при необходимости обращаться к малому собранию текстов, так как в него по большей части входят поздние работы.<br>
									 Запустите поиск с опцией -kn, чтобы также искать в следующих книгах КН: Дхаммапада, Удана, Итивуттака, Суттанипата, Тхерагатха, Тхеригатха. Другие книги КН не используются в поиске даже с параметром -kn. Вы можете использовать альтернативные ресурсы для поиска в Джатаках и остальных книгах КН.
									 <br>
									 Пример #1: -kn jamm 
									 <br>
									 Этот запрос выведет все совпадения по корню jamm из DN, MN, SN, AN + перечисленные книги KN.
									 									 <br>
									 Пример #2: jamm 
									 <br>
									 Выведет совпадения только из DN, MN, SN, AN.
									 <br><br>


							<strong>Совет #3 Виная</strong><br> 
                                   Если вы хотите искать в текстах Винаи добавьте -vin к поисковому запросу. К примеру, чтобы искать совпадение по cetana в Винае запрос должен выглядеть так: -vin cetana <br><br>
								   
									 <strong>Совет #4</strong><br>
                                    Используйте корень слова для более широких результатов поиска. Или к примеру с или без приставок, или окончаний, чтобы сузить результаты. 
									<br><br>
																												<strong>Совет #5</strong><br>
                                    Сделайте упор на Пали, используйте другие языки во вторую очередь. Пали - это язык на котором записаны самые древние тексты связанные с Дхаммой.	
									<br><br>
									<strong>Совет #6</strong><br>Результаты поиска на Пали - это: таблица совпадений по Суттам/Текстам с цитатами и таблица по словам. Используйте оба типа результатов, чтобы повысить пользу для вас.<br><br>
                                   <strong>Совет #7</strong><br>Минимальная длинна поискового запроса - 3 символа. Но если возможно ищите более длинные шаблоны. Так вы получите более точные результаты.<br><br>
                                   
								 
								 
									<strong>Совет #8</strong><br> 
                                   Мы рекомендуем искать на Пали. Так вы получите наилучшие результаты и вы разовьёте очень важную привычку - не полагаться слепо на переводы. Но очевидно, вы также можете получить некоторые преимущества от поисков на других языках. Если вы ищете животных, растения и т.п. К примеру, в текстах на Пали используется как минимум четыре разных слова. Тогда как на русском и английском это "змея" и "гадюка".<br><br>
				
									<strong>Совет #9</strong><br>
                                   Если запрос завершается ошибкой из-за таймаута, попробуйте более длинный поисковый запрос.  <br><br>
								  
								  <strong>Совет #10</strong><br>
                                   Если запрос завершается ошибкой из-за таймаута и вы не можете использовать  более длинный поисковый запрос, попробуйте <a href="./bg.php">Фоновый Режим</a>. Он может помочь.<br><br>  
									</p>
                                    <button class="btn btn-primary" data-bs-dismiss="modal">
                                        <i class="fas fa-xmark fa-fw"></i>
                                        Закрыть Окно
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/scripts.js"></script>
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->

    </body>
</html>
