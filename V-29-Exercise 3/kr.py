import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

def display_data(df):
    """Displays the uploaded CSV data in various formats."""

    # Display the DataFrame head
    st.subheader("Data Head")
    st.write(df.head())

    # Display data dimensions (rows and columns)
    st.subheader("Data Dimensions")
    st.write(f"Rows: {df.shape[0]}")
    st.write(f"Columns: {df.shape[1]}")

    # Display descriptive statistics
    st.subheader("Descriptive Statistics")
    st.write(df.describe())

    # User choice for visualization type
    chart_type = st.selectbox("Select Visualization", ("Line Chart", "Bar Chart", "Scatter Plot"))

    # Customize visualization based on user choice
    if chart_type == "Line Chart":
        selected_columns = st.multiselect("Select Columns for Line Chart", df.columns)
        if selected_columns:
            fig, ax = plt.subplots()
            for col in selected_columns:
                ax.plot(df.index, df[col], label=col)
            ax.legend()
            st.pyplot(fig)
    elif chart_type == "Bar Chart":
        selected_column = st.selectbox("Select Column for Bar Chart", df.columns)
        fig, ax = plt.subplots()
        ax.bar(df[selected_column].unique(), df[selected_column].value_counts())
        st.pyplot(fig)
    elif chart_type == "Scatter Plot":
        x_axis = st.selectbox("Select X-Axis Column", df.columns)
        y_axis = st.selectbox("Select Y-Axis Column", df.columns, key="y_axis")  # Avoid duplicate selection
        fig, ax = plt.subplots()
        ax.scatter(df[x_axis], df[y_axis])
        st.pyplot(fig)

    # Download DataFrame as CSV
    if st.button("Download CSV"):
        csv_file = df.to_csv()
        st.download_button(label="Download Data", data=csv_file, file_name="data.csv", mime="text/csv")

st.title("CSV Data Uploader and Visualizer")

uploaded_file = st.file_uploader("Choose a CSV file", type="csv")

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)
    display_data(df.copy())  # Avoid modifying original DataFrame for visualization customization

st.sidebar.markdown(
    """
    This Streamlit app allows you to upload a CSV file, view its data, generate descriptive statistics,
    and create various visualizations based on your selections.  Feel free to experiment with different
    options and download the data as a new CSV file.
    """
)
