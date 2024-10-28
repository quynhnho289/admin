import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
function TableCateoryItem(props) {
    const { product, index, changeCategoryProduct } = props;
    const [sale, setSale] = useState(false);
    const [news, setNews] = useState(false);
    const [popular, setPopular] = useState(false);
    useEffect(() => {
        product.category.map(item => {
            if (item === 'Sale') setSale(true);
            if (item === 'News') setNews(true);
            if (item === 'Popular') setPopular(true);
        })
    }, [product])
    const onChangeInput = (data, e, id) => {
        if (id === 'Sale') {
            setSale(data);
            if (data) {
                changeCategoryProduct({ status: data, category: id, id: product._id });
            } else {
                changeCategoryProduct({ status: data, category: id, id: product._id });
            }
        }
        if (id === 'News') {
            setNews(data);
            if (data) {
                changeCategoryProduct({ status: data, category: id, id: product._id });
            } else {
                changeCategoryProduct({ status: data, category: id, id: product._id });
            }
        }
        if (id === 'Popular') {
            setPopular(data);
            if (data) {
                changeCategoryProduct({ status: data, category: id, id: product._id });
            } else {
                changeCategoryProduct({ status: data, category: id, id: product._id });
            }
        }

    }
    return (
        <tbody>
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-center">{product.title}</td>
                <td className="text-center">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {product.urls.map(img => {
                            return <img key={img.id} src={img.url} alt={product.title} style={{ width: "40px", height: "50px", objectFit: "contain" }}></img>
                        })}
                    </div>
                </td>
                <td class="text-center">
                    <Switch onChange={onChangeInput} checked={sale} id="Sale" />
                </td>
                <td class="text-center">
                    <Switch onChange={onChangeInput} checked={news} id="News" />
                </td>
                <td class="text-center">
                    <Switch onChange={onChangeInput} checked={popular} id="Popular" />
                </td>
            </tr>
        </tbody>
    );
}

export default TableCateoryItem;