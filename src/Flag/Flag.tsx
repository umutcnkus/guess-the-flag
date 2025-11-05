import {Image} from 'antd';
import {useState} from 'react';
import './Flag.css';

interface FlagProps {
    countries: string[];
    order: number[];
}

function Flag({countries, order}: FlagProps) {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Image
                className='ant-card-bordered'
                preview={{visible: false}}
                height={'20rem'}
                src={"https://flagcdn.com/" + countries[0].toLowerCase() + ".svg"}
                onClick={() => setVisible(true)}
            />
            <div style={{display: 'none'}}>
                <Image.PreviewGroup preview={{visible, onVisibleChange: vis => setVisible(vis)}}>
                    {order.map((idx) => <Image key={idx} width={100} src={"https://flagcdn.com/" + countries[idx].toLowerCase() + ".svg"} /> )}
                </Image.PreviewGroup>
            </div>
        </>
    );
}

export default Flag;
