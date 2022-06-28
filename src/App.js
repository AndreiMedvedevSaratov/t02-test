import { useState, useEffect, useRef } from 'react';

import { Layout } from 'antd';

import 'antd/dist/antd.min.css';
import './App.css';

const { Header, Content } = Layout;

function App() {
	const requestsTableWrapper = useRef();
	const [size, setSize] = useState(null);
	const minWrapperSize = window.screen.width * 0.25;
	

	let wrapperSize = size ? { width: size.x } : null;

	if (size && size.x < minWrapperSize) {
		setSize(() => ({
			x: minWrapperSize
		}));
	}


	const mouseMoveHandler = (mouseDownEvent) => {
		if (!size) {
			return;
		}
		const startSize = size;
		const startPoint = { x: mouseDownEvent.pageX };

		function onMouseMove(mouseMoveEvent) {
			setSize(() => ({
				x: startSize.x - startPoint.x + mouseMoveEvent.pageX
			}));
		}

		function onMouseUp() {
			document.body.removeEventListener("mousemove", onMouseMove);
		}

		document.body.addEventListener("mousemove", onMouseMove);
		document.body.addEventListener("mouseup", onMouseUp, { once: true });
	};

	useEffect(() => {
		if (requestsTableWrapper && requestsTableWrapper.current) {
			setSize({ x: requestsTableWrapper.current.clientWidth });
		}
	}, []);

	return (
		<Layout>
			<Header>
				Test Application by Andrey Medvedev (React Developer) - <a href="https://github.com/AndreiMedvedevSaratov" title="My Github">My Github</a>
			</Header>

			<Content>
				<div
					className='requests-table__wrapper'
					ref={requestsTableWrapper}
					style={wrapperSize}
				>
					{/* <TableWithRequests> */}

					<button
						id="drag-pointer"
						type="button"
						onMouseDown={mouseMoveHandler}
					/>

				</div>

				{/* <MapComponent /> */}

			</Content>

		</Layout>
	);
}

export default App;
