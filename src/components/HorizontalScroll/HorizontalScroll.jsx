/* eslint-disable react/prop-types */
import { useRef, useState } from 'react';
import './stylesHorizontal.css';
import { useNavigate } from 'react-router-dom';

const HorizontalScroll = ({ items, type }) => {
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigation = useNavigate()

  const handleMouseDown = (e) => {
    e.preventDefault(); // Previne comportamento padrão ao clicar
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  }

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault(); // Previne comportamento padrão ao arrastar
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  }

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  }

  const handleTouchEnd = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const details = (i) => {
    if (type === "relacionados"){
      navigation(`?name=${i}`)
      return 'ok'
    }
    navigation(`Details/?name=${i}`)
  }


  return (
    <div
      className="scroll-container-pc"
      ref={scrollContainerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={(e) => {
        setIsDragging(true); // Define isDragging como true ao iniciar o toque
        handleTouchStart(e);
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {items.map((item, index) => (
        <div className="scroll-item-pc" key={index} onClick={() => details(item.name)}>
          <img src={type === "andamento" ? item.info[0].poster : item.poster} alt={item.id} className="img-poster-pc"/>
          {
            type === "andamento" && (
              <div className="overlay-pc">
                <p className='text-ep-pc'>T{item.seasonNumber < 10 ? `0${item.seasonNumber}` : item.seasonNumber} : E{item.episodioNumber < 10 ? `0${item.episodioNumber}` : item.episodioNumber}</p>
              </div>
            )
          }
        </div>
      ))}
    </div>
  );
};

export default HorizontalScroll;
