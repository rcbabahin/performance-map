import { useState, useCallback } from 'react';
import  Header from './Header';
import FilesTable from './FilesTable';
import { csvToJson } from '../utils/utils.js'

function Main(props) {
    const [files, setFiles] = useState({
		data: [],
		show: false,
		sortOrder: true
	});
 
    const handleViewClick = () => {
		setFiles({
			...files,
			show: true
		})
    };
  
    const handleFileChange = (e) => {
      if (!e.target.files) return;
		const { files } = e.target;
		const filesArr = [];
		// const namesArr = [];

		for (let i = 0; i < files.length; i++) {
		  	filesArr.push({
				file: files[i],
				name: files[i].name
		  	});
		  	// namesArr.push(files[i].name);
		}

		const arr = [];

		filesArr.forEach(({ file, name}) => {
			const reader = new FileReader();

			reader.onload = (e) => {
				const { result } = e.target;
				
				if (result) arr.push({ 
					file: csvToJson(result),
					name
				 });

				if (arr.length === files.length) setFiles({
					...files,
					data: [...arr]
				});
			}

			reader.readAsText(file);
		});
    };

	const handleEditCellSubmit = ({ row, cat, value, tableIndex }) => {
		const arr = files.data[tableIndex].file.map((item, rowIndex) => {
			if (rowIndex === row) {
				let clone = {...item};

				const categories = Object.keys(files.data[0].file[0]);

				categories.map((category, catIndex) => {
					if (catIndex === cat) clone[category] = value;
				})

				return clone;
			}

			return item;
		})

		setFiles({
			...files,
			data: [
				...files.data.slice(0, tableIndex),
				{
					file: [...arr],
					name: files.data[tableIndex].name
				},
				...files.data.slice(tableIndex + 1)
			]
		})
	}

	const handleSortByCategory = (category, tableIndex) => (e) => {

		const { sortOrder } = files;

		const arr = files.data[tableIndex].file.sort((a, b) => sortOrder ? b[category] - a[category]: a[category] - b[category] );

		setFiles({
			...files,
			data: [
				...files.data.slice(0, tableIndex),
				{
					file: [...arr],
					name: files.data[tableIndex].name
				},
				...files.data.slice(tableIndex + 1)
			],
			sortOrder: !files.sortOrder
		})
	}

    return (
		<div>
			<Header 
				files={files.data}
				handleFileChange={handleFileChange}
				handleViewClick={handleViewClick}
			/>
			{ files.show &&
				<FilesTable 
					files={files.data} 
					handleEditCellSubmit={handleEditCellSubmit}
					handleSortByCategory={handleSortByCategory}
				/>
			}
		</div>
    );
}

export default Main;