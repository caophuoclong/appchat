import React from 'react';
function ReadMore({ children }: { children: React.ReactNode }) {
  const text = children;
  const [isReadMore, setIsReadMore] = React.useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="inline">
      {isReadMore && (text! as string).length > 450
        ? (text! as string).slice(0, 450) + '...'
        : text}
      <span onClick={toggleReadMore} className="cursor-pointer text-blue-400">
        {(text as string).length > 450 && isReadMore
          ? ' Read more'
          : (text! as string).length >= 700
          ? ' Show less'
          : ''}
      </span>
    </p>
  );
}
export default ReadMore;
