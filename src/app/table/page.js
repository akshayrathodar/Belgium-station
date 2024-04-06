import variable from '../../styles/variables.module.scss';

export default function Table() {
    let TooltipCount = 0;
    const Headers = ({ number }) => {
        TooltipCount++;
        return <div className={variable.cell}>Header {number}<span className={variable.tooltip}>Tooltip {TooltipCount}</span></div>
    };

    const Rows = ({ number }) => {
        TooltipCount++;
        return <div className={variable.cell}>Rows {number}<span className={variable.tooltip}>Tooltip {TooltipCount}</span></div>
    };

    return (
        <div className={variable.container}>
            {Array.from({ length: 3 }).map((number, index) => {
                return <Headers number={index} />
            })}

            {Array.from({ length: 9 }).map((number, index) => {
                return <Rows number={index} />
            })}
        </div>
    );
}
