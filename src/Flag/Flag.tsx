import {Image} from 'antd';
import {useState} from 'react';
import './Flag.css';

interface FlagProps {
    countries: string[];
}

function Flag({countries}: FlagProps) {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Image
                preview={{visible: false}}
                width={'100%'}
                src={"https://countryflagsapi.com/svg/" + countries[0]}
                onClick={() => setVisible(true)}
            />
            <div style={{display: 'none'}}>
                <Image.PreviewGroup preview={{visible, onVisibleChange: vis => setVisible(vis)}}>
                    {countries.map((country) => <Image width={100} src={"https://countryflagsapi.com/svg/" + country} /> )}
                </Image.PreviewGroup>
            </div>
        </>
    );
}

export default Flag;
