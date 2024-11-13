import './stylesFooter.css';


const FooterCustom = () => {


    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h2 className="footer-logo">Senpai Animes</h2>
                    <p className="footer-description">
                        O seu portal de animes, filmes e muito mais. Mantenha-se atualizado com o nosso conteúdo e aproveite o melhor do mundo otaku!
                    </p>
                </div>

                <div className="footer-section links">
                    <h3>Links Úteis</h3>
                    <ul>
                        <li><a href="#">Início</a></li>
                        <li><a href="#">Animes</a></li>
                        <li><a href="#">Filmes</a></li>
                        <li><a href="#">Gêneros</a></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h3>Siga-nos</h3>
                    <div className="social-links">
                        <a href="#"><i className="bx bxl-facebook-circle"></i></a>
                        <a href="#"><i className="bx bxl-twitter"></i></a>
                        <a href="#"><i className="bx bxl-instagram-alt"></i></a>
                        <a href="#"><i className="bx bxl-youtube"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Senpai Animes. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default FooterCustom;

