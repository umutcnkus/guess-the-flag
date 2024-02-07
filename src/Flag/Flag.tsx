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
                src={"https://flagsapi.com/svg/" + countries[0]}
                onClick={() => setVisible(true)}
            />
            <div style={{display: 'none'}}>
                <Image.PreviewGroup preview={{visible, onVisibleChange: vis => setVisible(vis)}}>
                    {order.map((idx) => <Image width={100} src={"https://countryflagsapi.com/svg/" + countries[idx]} /> )}
                </Image.PreviewGroup>
            </div>
        </>
    );
}

export default Flag;
