/* eslint-disable react/prop-types */
import { useState } from 'react';
import './stylesPaginationComponent.css'; // Importando o CSS para o componente


const PaginationComponent = ({ total, setOffset }) => {

    // Definindo o array inicial de páginas e o estado atual do índice da página
    const [currentPage, setCurrentPage] = useState(1)
    const pages = Array.from({ length: total }, (_, i) => i + 1) // Array de 1 a 8

    // Limite para exibir 6 itens inicialmente
    const visibleItems = 6

    // Cálculo do índice do primeiro e último item visível
    const firstVisibleItem = Math.max(
        Math.min(currentPage, pages.length) - visibleItems + 1,
        1
    )
    const lastVisibleItem = firstVisibleItem + visibleItems - 1

    // Manipuladores de eventos para avançar e retroceder nas páginas
    const handleNext = () => {
        setOffset((prevPage) => prevPage + 1)
        setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length))
    }

    const toNextPage = (page) => {
        setCurrentPage(page)
        setOffset(page)
    }

    const handlePrevious = () => {
        setOffset((prevPage) => prevPage - 1)
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    return (
        <ul className="pagination">
            {/* Botão Anterior */}
            <li className="pagination__item">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    aria-label="Previous"
                    className="pagination__button"
                >
                    Anterior
                </button>
            </li>
            
            {/* Renderizando os botões de páginas */}
            {pages
                .slice(firstVisibleItem - 1, lastVisibleItem) // Mostra as páginas visíveis
                .map((page) => (
                    <li key={page} className="pagination__item">
                        <button
                            onClick={() => toNextPage(page)}
                            className={`pagination__button ${
                                currentPage === page ? 'pagination__button--active' : ''
                            }`}
                            aria-current={currentPage === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    </li>
                ))}

            {/* Botão Próxima */}
            <li className="pagination__item">
                <button
                    onClick={handleNext}
                    disabled={currentPage === pages.length}
                    aria-label="Next"
                    className="pagination__button"
                >
                    Próxima
                </button>
            </li>
        </ul>
    );
};

export default PaginationComponent;

